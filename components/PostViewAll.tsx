import { PostItemsPrivate } from '@components/PostItemsPrivate'
import { GhostPostsOrPages, GhostSettings } from '@lib/ghost'

interface PostViewProps {
  settings: GhostSettings
  postsAll: GhostPostsOrPages
  isHome?: boolean
}

export const PostViewAll = (props: PostViewProps) => (
  <div className="inner posts">
    <div className="post-feed">
      <PostItemsPrivate {...props} />
    </div>
  </div>
)
