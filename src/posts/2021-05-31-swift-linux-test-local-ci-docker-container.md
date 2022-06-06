---
title: "How to test your Swift source code on Linux: locally and on Github Actions"
description: "Quick tips (useful for open source projects) for testing your Swift source code on Linux locally 
and with Github Actions."
date: 2021-05-31
image: ../images/posts/spm-swift.jpg
tags: [swift, ios, apple, mobile application development, macos, tvos, watchos]
comments: true 
math: false 
authors: [fabrizio_duroni]
---

*Quick tips (useful for open source projects) for testing your Swift source code on Linux locally
and with Github Actions.*

---

In my [previous posts](https://www.fabrizioduroni.it/2018/05/08/id3tageditor-swift-read-write-id3-tag-mp3/ 
"id3tageditor swift") I already talked a lot (maybe too much :sweat_smile: ) about my open source project 
[ID3TagEditor](https://github.com/chicio/ID3TagEditor "id3 tag swift"), that recently surpassed one hundred stars on 
github! :tada: In particular, if you read my article about [creating a Swift library for Linux and macOS](https://www.fabrizioduroni.it/2019/01/03/swift-package-manager-linux-macos-create-library-executable/ "swift 
library linux macos") you already know that ID3TagEditor officially support also the Linux platform. In last years I 
have been an "Apple fan" guy, and I have only Apple devices in my home. So how do I test a new feature or a change 
to the ID3TagEditor library on Linux? In this article I will show you two quick tips on how you can test a Linux 
compatible Swift library on Linux locally on your machine (without the need for a dual boot installation) and in your 
Github CI workflow with Github Actions. 

#### Implementation

Let's start from the local testing. If you go to the official Swift website, there's a section dedicated to the 
officially supported platform. From there you can go to the [download section](https://swift.org/download/#docker) where you can find all links to the 
latest swift source packages for each supported platform. If you go at the end of this section there a docker 
section specifically related to Ubuntu Linux! So guess what? We can use Docker to test our Swift source code on 
Linux.So start docker and then run the command below from the root dir of our source code.  

```shell
docker run --rm --privileged \
        --interactive --tty \
        --name swift-latest \
        --volume "$(pwd):/ID3TagEditor" \
        --workdir "/ID3TagEditor" \
        swift:latest /bin/bash 
```

You can replace the `ID3TagEditor` folder name above with any name you want. After the container is created you will 
be in your source code dir and you can use the usual `swift build`, `swift test` (and if you need `swift package 
clean`) to test your source code.  
Now that you tested your code locally you are ready to publish it on Github. Obviously you want to put in place a 
CI workflow with Github Actions to test that changes to the code will not break it. How can you do it? If you search 
on Google, you will find some Github Actions that replicate with some scripts all the steps needed in order to 
install Swift on Linux. Do NOT use them!! There's no need for this type of actions!! :satisfied: In fact we just 
need to read carefully the [Github Actions syntax documentation](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idcontainer "github action syntax documentation").    
If you scroll down that page you will find that you can launch a container on your Github Action runner on top of 
the [virtual environment](https://github.com/actions/virtual-environments) of your GitHub Actions hosted runners. So 
we just need to specify the container image name, and we are done!! :tada: You can also check the previous 
documentation link for other customization option if you need them. Below you can find the [Github Action yaml I'm 
using for ID3TagEditor](https://github.com/chicio/ID3TagEditor/blob/master/.github/workflows/build-linux.yml) (you can copy/paste it in your projects and remove last part to use it).

```yaml
name: Build Linux

on:
  push:
    branches:
      - '*'
  pull_request:
    branches:
      - main

jobs:
  build:
    name: Build Linux
    runs-on: ubuntu-latest
    container:
      image: swift:latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Build Linux framework
        run: |
          swift build
          swift test
      - name: Build Linux Demo
        run: |
          cd Demo/Demo\ Ubuntu
          swift build
```

#### Conclusion

Yes that's all for Swift testing on Linux locally and on Github Actions. I promised you it would have been a "quick 
tips" post. :stuck_out_tongue_closed_eyes: I hope you will find it useful.  
