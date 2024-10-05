// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const login = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPlayer(null);
    localStorage.removeItem("loggedInUser");
  };

  const checkLoginStatus = () => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser && storedUser !== "") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setCurrentUser(parsedUser);
        fetchPlayerData();
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        forceLoginTestUser(); // 데이터 파싱 실패 시 테스트 유저로 강제 로그인
      }
    } else {
      forceLoginTestUser(); // 저장된 사용자 데이터가 없으면 테스트 유저로 강제 로그인
    }
  };

  const forceLoginTestUser = () => {
    const testUser = { id: 123, username: "test_user" };
    login(testUser);
    fetchPlayerData(); // 플레이어 데이터 가져오기
  };

  const fetchPlayerData = async () => {
    try {
      const response = await fetch("/api/player");
      if (!response.ok) throw new Error("Failed to fetch player data");
      const data = await response.json();
      setCurrentPlayer(data);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const updatePlayerData = async (data) => {
    try {
      const response = await fetch("/api/player", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update player data");
      const updatedData = await response.json();
      setCurrentPlayer(updatedData);
    } catch (error) {
      console.error("Error updating player data:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        currentPlayer,
        login,
        logout,
        checkLoginStatus,
        forceLoginTestUser,
        fetchPlayerData,
        updatePlayerData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
