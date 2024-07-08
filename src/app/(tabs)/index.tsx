import { FlatList } from 'react-native';
import posts from '~/assets/data/posts.json';
import PostListItem from "../../../components/post-list-item";

export default function FeedScreen() {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{ gap: 10 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
