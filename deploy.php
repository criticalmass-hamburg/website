<?php

use Tmd\AutoGitPull\Deployer;

require 'vendor/autoload.php';

$deployer = new Deployer([
    // IP addresses that are allowed to trigger the pull
    // (CLI is always allowed)
    'allowedIpRanges' => [
        '131.103.20.160/27', // Bitbucket
        '165.254.145.0/26', // Bitbucket
        '104.192.143.0/24', // Bitbucket
        '104.192.143.192/28', // Bitbucket (Dec 2015)
        '104.192.143.208/28', // Bitbucket (Dec 2015)
        '192.30.252.0/22', // GitHub
    ],

    // These are added to the allowedIpRanges array
    // to avoid having to define the Bitbucket/GitHub IPs in your own code
    'additionalAllowedIpRanges' => [
        '192.168.0.2/24'
    ],

    // Git branch to reset to
    'branch' => 'master',

    // Directory of the repository
    'directory' => '/home/cmhh/www/',

    // Path to the pull script
    // (You can provide your own script instead)
    'pullScriptPath' => __DIR__ . '/vendor/tmd/auto-git-pull/scripts/git-pull.sh',

    // Git remote to fetch from
    'remote' => 'origin'
]);

$deployer->postDeployCallback = function () {
    echo 'Yay!';
};

$deployer->deploy();