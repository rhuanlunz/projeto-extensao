interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {

  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  )

  if (
    email === "admin@gmail.com" &&
    password === "123456"
  ) {

    return {
      token: "fake-token",

      user: {
        id: "1",
        name: "Pedro",
        email,
      },
    }
  }

  // Erro login
  throw new Error("Credenciais inválidas")
}