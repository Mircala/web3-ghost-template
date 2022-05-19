# Overview

Open Source web3 client that consumes the content of a headless CMS and displays information based on the tokens you have or your activity in blockchain. This functionality enables the gamification of communities and their effective use, being able to discriminate access to content based on the behavior of each user to the community, having been all recorded in the blockchain.

# Features



* Connection with Ghost to retrieve the content (pages, posts, tags, authors and navigation).
* Web3 Login through Coinbase Wallet, Metamask and WalletConnect connection.
* Discrimination of content by web3 based on:
    * NFTs held by the user.
    * ERC20 tokens held by the user.
* Content discrimination management administration (content relationship with NFTs, erc20, etc).

# Tech stack

* Next.js with the following packages:
    * @thirdweb-dev/react
    * @tryghost/content-api
    * dayjs
    * ethers
    * styled-components

* Ghost CMS (headless).

# Architecture

![alt_text](web3-ghost-template-arch.png "image_tooltip")



# 🏁 Getting Started

```bash
git clone https://github.com/styxlab/next-cms-ghost.git
cd next-cms-ghost
npm install
```
## Development
```bash
npm run dev
```
## Production
```bash
npm run build
```

Create a new text file `.env.local` in the project root folder with the following content:

```
CMS_GHOST_API_URL=http://localhost:2368
CMS_GHOST_API_KEY=9fccdb0e4ea5b572e2e5b92942
```

# 🤯 Ensure headless mode of Ghost CMS

For best SEO results it is strongly recommended to disable the default Ghost Handlebars theme front-end by selecting the _Make this site private_ flag within your Ghost admin settings.

# Setup
To setup the web3 template, you need to create 3 differents tags on Ghost CMS admin dashboard.

You should go to the left sidebar and join to the 'Tags' section, next you have to create new tag, once on the creating screen, name it 'FULL PRIVATE', and later, create another two, named 'PRIVATE' and 'PUBLIC'. This three tags will discriminate your content on the frontend automatically.

In addition, you have the possibility of creating new tags on the Ghost CMS tag screen for web3 content discriminating purposes.
For example, you can create a tag that includes in the name input the symbol of the desired protocol, and the contract address on the slug input, by this way you are able to filter the users who have permission to read certain posts.

Description about the 3 different access to the content:

FULL PRIVATE won't show the content on the frontend until you login with a wallet.
PRIVATE will appear on the blog and it's free to join and read the first 15 lines of the post, only shows the full content if the users log in with the wallet and the conditions you put on the tags.
PUBLIC will show the content on the blog to all users and it's readable by all visitors.

# 💣 Reporting issues

Please report all bugs and issues at [next-cms-ghost/issues](https://github.com/Mircala/web3-ghost-template/issues).

&nbsp;

# Additional documentation

[Ghost docs: Getting Started](https://ghost.org/help/topic/setting-up/)

## For writers and editors

[How to write and publish content on ghost](https://ghost.org/resources/how-to-publish-your-first-post/)

[A pre-publishing and post-publishing guide for new writers](https://ghost.org/resources/newsletter-checklist/)

[How to format a blog post: A complete guide for new writers](https://ghost.org/resources/how-to-format-a-blog-post/)


## Ghost for admins or technical staff

[Ghost github repo](https://github.com/TryGhost/Ghost)

[Official ghost image container](https://hub.docker.com/_/ghost/)
