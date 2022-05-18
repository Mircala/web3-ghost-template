import next, { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { Layout } from '@components/Layout'
import { PostView } from '@components/PostView'
import { PostViewAll } from '@components/PostViewAll'
import { HeaderIndex } from '@components/HeaderIndex'
import { StickyNavContainer } from '@effects/StickyNavContainer'
import { SEO } from '@meta/seo'

import { processEnv } from '@lib/processEnv'
import { getAllPosts, getAllPostsIncludingPrivates, getAllSettings, GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'
import { seoImage, ISeoImage } from '@meta/seoImage'

import { BodyClass } from '@helpers/BodyClass'

import { Claim } from 'components/homecontent/homecontent'

import ConnectDropdown from '@components/ConnectDropdown'
import { CreateMagicLink } from '@components/CreateMagicLink'

import GhostContentAPI from '@tryghost/content-api'

import { ghostAPIUrl, ghostAPIKey } from '@lib/processEnv'

import { useAddress } from '@thirdweb-dev/react'

/**
 * Main index page (home page)
 *
 * Loads all posts from CMS
 *
 */

interface CmsData {
  postsAll: GhostPostsOrPages
  posts: GhostPostsOrPages
  settings: GhostSettings
  seoImage: ISeoImage
  previewPosts?: GhostPostsOrPages
  prevPost?: GhostPostOrPage
  nextPost?: GhostPostOrPage
  bodyClass: string
}

interface IndexProps {
  cmsData: CmsData
}

const api = new GhostContentAPI({
  url: ghostAPIUrl,
  key: ghostAPIKey,
  version: "v3"
});

export default function Index({ cmsData }: IndexProps) {

  const address = useAddress()

  const router = useRouter()
  if (router.isFallback) return <div>Loading...</div>
  
  const { settings, posts, postsAll, seoImage, bodyClass } = cmsData

  return (
    <>
      <SEO {...{ settings, seoImage }} />
      <StickyNavContainer
        throttle={300}
        activeClass="fixed-nav-active"
        render={(sticky) => (
          <Layout {...{ bodyClass, sticky, settings, isHome: true }} header={<HeaderIndex {...{ settings }} />}>
            <Claim></Claim>
            <br></br>
            <br></br>
            <h2 style={{ textAlign: "center" }}>Connect your wallet to view private content</h2>
            <br></br>
            <CreateMagicLink />
            {address ? (
              <PostViewAll {...{ settings, postsAll, isHome: true }} />
              ) : (
              <PostView {...{ settings, posts, isHome: true }} />
            )}
          </Layout>
        )}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let settings
  let posts: GhostPostsOrPages | []
  let postsAll: GhostPostsOrPages | []

  console.time('Index - getStaticProps')

  try {
    settings = await getAllSettings()
    posts = await getAllPosts()
    postsAll = await getAllPostsIncludingPrivates()
  } catch (error) {
    throw new Error('Index creation failed.')
  }

  const cmsData = {
    settings,
    postsAll,
    posts,
    seoImage: await seoImage({ siteUrl: settings.processEnv.siteUrl }),
    bodyClass: BodyClass({ isHome: true }),
  }

  console.timeEnd('Index - getStaticProps')

  return {
    props: {
      cmsData,
    },
    ...(processEnv.isr.enable && { revalidate: processEnv.isr.revalidate }), // re-generate at most once every revalidate second
  }
}
