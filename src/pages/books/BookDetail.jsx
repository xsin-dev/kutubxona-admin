import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Container,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconHeart, IconHeartFilled, IconArrowLeft } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { API } from "../../api/api";
import authStore from "../../store/authStore";
import { IconCheck, IconX } from "@tabler/icons-react";
import BookImage from "../../../public/image/kitob.jpg"

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { likedBooks, toggleLiked } = authStore();

  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await API.get(`/books/book/${id}/`);
      return res.data;
    },
  });

  const { mutate: deleteBook, isPending: isDeleting } = useMutation({
    mutationFn: async () => API.delete(`/books/book/${id}/`),
    onSuccess: () => {
      notifications.show({
        title: "Muvaffaqiyatli",
        message: "Kitob o'chirildi",
        color: "green",
        icon: <IconCheck size={20} />,
      });
      navigate("/books");
    },
    onError: () => {
      notifications.show({
        title: "Xato",
        message: "Kitobni o'chirishda xato yuz berdi",
        color: "red",
        icon: <IconX size={20} />,
      });
    },
  });

  const confirmDelete = () =>
    modals.openConfirmModal({
      title: "Kitobni o'chirish",
      children: <Text size="sm">Haqiqatan ham bu kitobni o'chirmoqchimisiz?</Text>,
      labels: { confirm: "O'chirish", cancel: "Bekor qilish" },
      confirmProps: { color: "red", variant: "filled" },
      onConfirm: () => deleteBook(),
    });

  if (isLoading) {
    return (
      <Center h="100vh" style={{ background: "#0b111b" }}>
        <Loader size="xl" color="indigo" variant="bars" />
      </Center>
    );
  }

  if (error || !book) {
    return (
      <Center h="100vh" style={{ background: "#0b111b" }}>
        <Stack align="center" gap="md">
          <Title order={2} c="gray.5">Kitob topilmadi</Title>
          <Button onClick={() => navigate("/books")} variant="outline" color="gray">
            Orqaga qaytish
          </Button>
        </Stack>
      </Center>
    );
  }

  const isLiked = likedBooks[book.id];

  return (
    <div size="md" my="xl" >
      <div
        className="bg-[#0f172a]/90 backdrop-blur-xl border-gray-800/50 rounded-2xl p-10"
      >
        <Group justify="space-between" mb="lg">
          <ActionIcon variant="subtle" color="gray" onClick={() => navigate(-1)}>
            <IconArrowLeft size={24} />
          </ActionIcon>
          <Group gap="xs">
            <ActionIcon
              variant="filled"
              color="red"
              radius="xl"
              size="lg"
              loading={isDeleting}
              onClick={confirmDelete}
              className="hover:scale-105 transition-transform"
            >
              <IconTrash size={20} />
            </ActionIcon>
          </Group>
        </Group>

        <Group grow wrap="nowrap" align="flex-start" gap="xl">
          <div className="relative group">
            <Image
              src={BookImage}
              alt={book.name}
              radius="xl"
              height={450}
              fit="cover"
              className="transition-all duration-300 group-hover:scale-101 group-hover:shadow-2xl "
            />
          </div>

          <Stack justify="space-between" h={450}>
            <Stack gap="xs">
              <Title fw={800} size={35} className="tracking-tight text-[#d9dee9]">
                {book.name}
              </Title>
              <Text size="xl" c="gray.4" fw={500}>
                Muallif: {book.author}
              </Text>
              <Text size="lg" c="gray.5">
                Nashriyot: {book.publisher}
              </Text>
            </Stack>

            <Stack gap="md">
              <Badge
                color="green"
                variant="light"
                size="xl"
                radius="xl"
                className="self-start"
              >
                {book.quantity_in_library} dona mavjud
              </Badge>

              <Group gap="xs">
                <ActionIcon
                  variant={isLiked ? "filled" : "light"}
                  color="red"
                  size="xl"
                  radius="xl"
                  onClick={() => toggleLiked(book)}
                  className="hover:scale-110 transition-transform"
                >
                  {isLiked ? <IconHeartFilled size={24} /> : <IconHeart size={24} />}
                </ActionIcon>
                <Text size="sm" c="gray.5">
                  {isLiked ? "Sevimlilardan chiqarish" : "Sevimlilarga qo'shish"}
                </Text>
              </Group>
            </Stack>
          </Stack>
        </Group>

      </div>
    </div>
  );
};

export default BookDetail;