import { PostCard } from '@components/PostCard'
import { GhostPostsOrPages, GhostSettings } from '@lib/ghost'

interface PostItemsProps {
  settings: GhostSettings
  postsAll: GhostPostsOrPages
  isHome?: boolean
}

export const PostItemsPrivate = ({ settings, postsAll, isHome }: PostItemsProps) => (
  <>
    {postsAll.map((post, i) => (
      <PostCard key={i} {...{settings, post, isHome, num: i }} />
    ))}
  </>
)
