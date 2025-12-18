import {
  Button,
  Container,
  PasswordInput,
  TextInput,
  Title,
  Paper,
  Stack,
  Text,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";
import authStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/api";

const Login = () => {
  const { login } = authStore();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      phone: "",
      password: "",
    },
    validate: {
      phone: (value) =>
        value.trim().length < 9 ? "Telefon raqamni to'ldiring" : null,
      password: (value) =>
        value.length < 6 ? "Parol 6 belgidan iborat bo'lishi kerak" : null,
    },
  });

  const { mutate: adminLogin, isPending } = useMutation({
    mutationFn: (body) => API.post("/auth/login/", body),
    onSuccess: (res) => {
      login(res.data.user, res.data.access);
      notifications.show({
        title: "Muvaffaqiyatli!",
        message: "Tizimga kirish amalga oshirildi",
        color: "green",
        icon: <IconCheck size={20} />,
      });
      navigate("/profile");
    },
    onError: () => {
      notifications.show({
        title: "Xato",
        message: "Telefon raqam yoki parol noto'g'ri",
        color: "red",
        icon: <IconX size={20} />,
      });
    },
  });

  const handleSubmit = (values) => {
    adminLogin({ phone: values.phone, password: values.password });
  };

  return (
    <Container fluid h="100vh" className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #4c1d95 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[#1e293b]" /> 

      <Center h="100%">
        <Paper
          radius="lg"
          p="xl"
          shadow="2xl"
          w={460}
          className="bg-gray-900/95 dark:bg-black/90 backdrop-blur-xl border border-gray-800"
        >
          <Stack gap="xl">
            <div className="text-center">
              <Title
                order={1}
                size={38}
                fw={700}
                className="mb-3 text-blue-950"
              >
                Kutubxona Admin
              </Title>
              <Text size="lg" c="black">
                Tizimga kirish uchun ma'lumotlarni kiriting
              </Text>
            </div>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Telefon raqam"
                  placeholder="+998 90 123 45 67"
                  size="md"
                  radius="md"
                  required
                  {...form.getInputProps("phone")}
                  classNames={{
                    input: "bg-gray-800/50 border-gray-700 focus:border-indigo-500",
                    label: "text-gray-300",
                  }}
                />

                <PasswordInput
                  label="Parol"
                  placeholder="Parolni kiriting"
                  size="md"
                  radius="md"
                  required
                  {...form.getInputProps("password")}
                  classNames={{
                    input: "bg-gray-800/50 border-gray-700 focus:border-indigo-500",
                    label: "text-gray-300",
                  }}
                />

                <Button
                  type="submit"
                  size="md"
                  radius="md"
                  fullWidth
                  loading={isPending}
                  loaderProps={{ type: "dots" }}
                  className="mt-6 font-medium bg-blue-950"
                >
                  Kirish
                </Button>
              </Stack>
            </form>

          </Stack>
        </Paper>
      </Center>
    </Container>
  );
};

export default Login;