import { Redirect, Stack } from 'expo-router';
import {useAuth} from "~/providers/auth-provider";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack />;
}
