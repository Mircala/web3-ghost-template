/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'

import { readingTime as readingTimeHelper } from '@lib/readingTime'

import { resolveUrl } from '@utils/routing'
import { getLang, get } from '@utils/use-lang'

import { Layout } from '@components/Layout'
import { HeaderPost } from '@components/HeaderPost'
import { AuthorList } from '@components/AuthorList'
import { PreviewPosts } from '@components/PreviewPosts'
import { RenderContent } from '@components/RenderContent'
import { TableOfContents } from '@components/toc/TableOfContents'

import { StickyNavContainer } from '@effects/StickyNavContainer'
import { SEO } from '@meta/seo'

import { PostClass } from '@helpers/PostClass'
import { GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'
import { collections } from '@lib/collections'

import { ISeoImage } from '@meta/seoImage'

import React from 'react'

import { useAddress } from '@thirdweb-dev/react'

interface PostProps {
  cmsData: {
    post: GhostPostOrPage
    settings: GhostSettings
    seoImage: ISeoImage
    previewPosts?: GhostPostsOrPages
    prevPost?: GhostPostOrPage
    nextPost?: GhostPostOrPage
    bodyClass: string
  }
}

export const Post = ({ cmsData }: PostProps) => {
  const address = useAddress()
  const { post, settings, seoImage, previewPosts, bodyClass } = cmsData
  const { slug, url, meta_description, excerpt, title } = post
  const { url: cmsUrl } = settings
  const description = meta_description || excerpt

  const { processEnv } = settings
  const { nextImages, toc, memberSubscriptions, commenting } = processEnv

  const lang = settings.lang
  const text = get(getLang(lang))
  const readingTime = readingTimeHelper(post).replace(`min read`, text(`MIN_READ`))
  const featImg = post.featureImage
  const postClass = PostClass({ tags: post.tags, isFeatured: !!featImg, isImage: !!featImg })

  const htmlAst = post.htmlAst
  if (htmlAst === undefined) throw Error('Post.tsx: htmlAst must be defined.')

  const collectionPath = collections.getCollectionByNode(post)

  const 

  return (
    <>
      <SEO {...{ description, settings, seoImage, article: post, title }} />
      <StickyNavContainer
        throttle={300}
        isPost={true}
        activeClass="nav-post-title-active"
        render={(sticky) => (
          <Layout
            {...{ bodyClass, settings, sticky }}
            header={<HeaderPost {...{ settings, sticky, title }} />}
            previewPosts={<PreviewPosts {...{ settings, primaryTag: post.primary_tag, posts: previewPosts }} />}
          >
            <div className="inner">
              <article className={`post-full ${postClass}`}>
                <header className="post-full-header">
                  {post.primary_tag && (
                    <section className="post-full-tags">
                      <Link href={resolveUrl({ cmsUrl, slug: post.primary_tag.slug, url: post.primary_tag.url })}>
                        <a>{post.primary_tag.name}</a>
                      </Link>
                    </section>
                  )}

                  <h1 ref={sticky && sticky.anchorRef} className="post-full-title">
                    {title}
                  </h1>

                  {post.custom_excerpt && <p className="post-full-custom-excerpt">{post.custom_excerpt}</p>}

                  <div className="post-full-byline">
                    <section className="post-full-byline-content">
                      <AuthorList {...{ settings, authors: post.authors, isPost: true }} />

                      <section className="post-full-byline-meta">
                        <h4 className="author-name">
                          {post.authors?.map((author, i) => (
                            <div key={i}>
                              {i > 0 ? `, ` : ``}
                              <Link href={resolveUrl({ cmsUrl, slug: author.slug, url: author.url || undefined })}>
                                <a>{author.name}</a>
                              </Link>
                            </div>
                          ))}
                        </h4>
                        <div className="byline-meta-content">
                          <time className="byline-meta-date" dateTime={post.published_at || ''}>
                            {dayjs(post.published_at || '').format('D MMMM, YYYY')}&nbsp;
                          </time>
                          <span className="byline-reading-time">
                            <span className="bull">&bull;</span> {readingTime}
                          </span>
                        </div>
                      </section>
                    </section>
                  </div>
                </header>

                {featImg &&
                  (nextImages.feature && featImg.dimensions ? (
                    <figure className="post-full-image" style={{ display: 'inherit' }}>
                      <Image
                        src={featImg.url}
                        alt={title}
                        quality={nextImages.quality}
                        layout="responsive"
                        sizes={`
                              (max-width: 350px) 350px,
                              (max-width: 530px) 530px,
                              (max-width: 710px) 710px,
                              (max-width: 1170px) 1170px,
                              (max-width: 2110px) 2110px, 2000px
                            `}
                        {...featImg.dimensions}
                      />
                    </figure>
                  ) : (
                    post.feature_image && (
                      <figure className="post-full-image">
                        <img src={post.feature_image} alt={title} />
                      </figure>
                    )
                  ))}

                <section className="post-full-content">
                  {toc.enable && !!post.toc && <TableOfContents {...{ toc: post.toc, url: resolveUrl({ cmsUrl, collectionPath, slug, url }), maxDepth: toc.maxDepth, lang }} />}
                  <div className={address! && post!.primary_tag!.slug! == "full-private" || address! && post!.primary_tag!.slug! == "private" || post!.primary_tag!.slug! == "public" ? "post-content load-external-scripts" : "text"}>
                    <RenderContent htmlAst={htmlAst} />
                  </div>
                </section>
              </article>
            </div>
          </Layout>
        )}
      />
    </>
  )
}
