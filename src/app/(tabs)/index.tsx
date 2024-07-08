import {Alert, FlatList} from 'react-native';
import posts from '~/assets/data/posts.json';
import PostListItem from "../../../components/post-list-item";
import {useEffect, useState} from "react";
import {supabase} from "~/lib/supabase";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from('posts')
      .select('*, user:profiles(*)')
      .order('created_at', { ascending: false });
    if (error) {
      Alert.alert('Something went wrong');
    }
    setPosts(data);
    setLoading(false);
  };
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{
        gap: 10,
        maxWidth: 512,
        alignSelf: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}
      onRefresh={fetchPosts}
      refreshing={loading}
    />
  );
}
