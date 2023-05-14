import axios from 'axios';

// 다른 명칭을 사용하여 함수를 내보냄
export async function handleLoginSuccess(next) {
  await axios.get("http://localhost:3000/login/success", {
    withCredentials: true,
  });
}