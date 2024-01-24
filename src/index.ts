import { task } from "hardhat/config";
import abi2solidity from "abi2solidity";
import fs from "fs";

task("gen-interface", "Generate a new Solidity interface for a given file")
  .addPositionalParam("contract", "Solidity contract name")
  .setAction(async ({ contract }, hre) => {
    const artifact = await hre.artifacts.readArtifact(contract);

    const outputFile = hre.config.paths.root
      + '/'
      + artifact.sourceName.replace(/[^\/]+.sol/, `I${contract}.sol`);

    const solidity = abi2solidity(JSON.stringify(artifact.abi))
      .replace('GeneratedInterface', `I${contract}`);

    fs.writeFileSync(outputFile, solidity)
    console.log(`Generated interface I${contract}`);
  });
