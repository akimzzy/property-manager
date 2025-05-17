import { useCookie } from "#app";
import { jwtDecode } from "jwt-decode";
import { type Ref, computed } from "vue";

interface DecodedToken {
  [key: string]: any;
}

export type AccessToken = {
  access_token: string;
  account: "manager" | "tenant";
};

export function useDecodedAuth() {
  const accessToken: Ref<AccessToken | null> = useCookie("access_token");

  const decoded = computed<DecodedToken | null>(() => {
    if (!accessToken.value) return null;
    try {
      return jwtDecode(accessToken.value.access_token);
    } catch (e) {
      return null;
    }
  });

  const role = computed(() => accessToken.value?.account);

  const isValid = computed(() => {
    return !!decoded.value;
  });

  const logout = () => {
    accessToken.value = null;
    navigateTo("/auth/login");
  };

  const login = (authToken: AccessToken) => {
    accessToken.value = authToken;
    navigateTo("/dashboard");
  };

  return { logout, login, isValid, decoded, role, accessToken };
}
