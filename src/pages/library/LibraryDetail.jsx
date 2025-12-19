
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../api/api";
import { IconArrowLeft, IconPhone, IconBrandTelegram, IconBrandInstagram, IconLocation, IconBrandFacebook } from "@tabler/icons-react";
import {
    ActionIcon,
    Badge,
    Card,
    Center,
    Container,
    Group,
    Image,
    Skeleton,
    Stack,
    Table,
    Text,
    Title,
    Anchor,
} from "@mantine/core";

const LibraryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: response, isLoading, error } = useQuery({
        queryKey: ["library", id],
        queryFn: async () => {
            const res = await API.get(`/libraries/library/${id}/`);
            console.log(res.data);

            return res.data.results
        },
    });

    const getMapUrl = (lat, lon) => {
        if (!lat || !lon) return null;
        return `https://static-maps.yandex.ru/1.x/?lang=uz_UZ&ll=${lon},${lat}&z=15&size=650,400&l=map&pt=${lon},${lat},pm2rdm`;
    };

    const library = response?.library;
    const books = response?.books || [];
    const mapUrl = library ? getMapUrl(library.latitude, library.longitude) : null;

    if (isLoading) {
        return (
            <Container size="xl" my="xl" style={{ background: "#0b111b" }}>
                <div className="bg-[#0b111b]/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                    <Group justify="space-between" mb="xl">
                        <Skeleton height={44} width={44} radius="xl" />
                        <Skeleton height={120} width="80%" radius="md" />
                    </Group>

                    <Group grow wrap="nowrap" align="stretch" gap="xl">
                        <Stack gap="lg" className="w-full max-w-md">
                            <Skeleton height={300} radius="xl" />
                            <Skeleton height={40} width="100%" radius="md" />
                            <Skeleton height={40} width="100%" radius="md" />
                            <Skeleton height={80} width="100%" radius="md" />
                        </Stack>

                        <Skeleton height={400} radius="xl" className="w-full" />
                    </Group>

                    <Stack mt="xl" gap="md">
                        <Skeleton height={40} width="30%" radius="md" />
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} height={60} radius="lg" />
                        ))}
                    </Stack>
                </div>
            </Container>
        );
    }

    if (error || !library) {
        return (
            <Center h="80vh" style={{ background: "#0b111b" }}>
                <Stack align="center" gap="md">
                    <Title order={2} c="gray.5">Kutubxona topilmadi</Title>
                    <ActionIcon variant="subtle" size="xl" onClick={() => navigate(-1)}>
                        <IconArrowLeft size={32} />
                    </ActionIcon>
                </Stack>
            </Center>
        );
    }

    return (
        <Container size="xl" my="xl">
            <div className="bg-[#0b111b] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-800/50">
                <Group justify="flex-start" mb="xl">
                    <ActionIcon variant="subtle" size="xl" color="gray" onClick={() => navigate(-1)}>
                        <IconArrowLeft size={32} />
                    </ActionIcon>
                </Group>

                <Group grow wrap="nowrap" align="stretch" gap="xl">
                    <Stack gap="lg" className="w-full max-w-lg">
                        <div className="bg-[#1a202e]/70 p-10 rounded-2xl">
                            <Stack gap="md">
                                <Title order={2} fw={800} c="white" size={32}>
                                    Kutubxona haqida ma'lumot
                                </Title>
                                <div>
                                    <Text size="sm" c="gray.5">Manzil</Text>
                                    <Group gap="xs" mt="10px">
                                        <IconLocation size={18} color="#818cf8" />
                                        <Text fw={600} c="white">{library.address}</Text>
                                    </Group>
                                </div>

                                <div>
                                    <Text size="sm" c="gray.5">Telefon</Text>
                                    <Group gap="xs" mt="10px">
                                        <IconPhone size={18} color="#818cf8" />
                                        <Text fw={600} c="white">{response?.phone || "-"}</Text>
                                    </Group>
                                </div>

                                {library.social_media && (
                                    <div>
                                        <Text size="sm" c="gray.5" mb="xs">Ijtimoiy tarmoqlar</Text>
                                        <Group gap="md">
                                            {library.social_media.telegram && (
                                                <Anchor href={library.social_media.telegram} target="_blank">
                                                    <ActionIcon variant="filled" color="blue" radius="xl" size="lg">
                                                        <IconBrandTelegram size={24} />
                                                    </ActionIcon>
                                                </Anchor>
                                            )}
                                            {library.social_media.instagram && (
                                                <Anchor href={library.social_media.instagram} target="_blank">
                                                    <ActionIcon variant="filled" color="pink" radius="xl" size="lg">
                                                        <IconBrandInstagram size={24} />
                                                    </ActionIcon>
                                                </Anchor>
                                            )}
                                            {library.social_media.facebook && (
                                                <Anchor href={library.social_media.facebook} target="_blank">
                                                    <ActionIcon variant="filled" color="blue" radius="xl" size="lg">
                                                        <IconBrandFacebook size={24} />
                                                    </ActionIcon>
                                                </Anchor>
                                            )}
                                        </Group>
                                    </div>
                                )}

                                <Badge color="indigo" variant="light" size="lg" radius="xl" mt="10">
                                    Jami kitoblar: {response?.total_books || library.total_books}
                                </Badge>
                            </Stack>
                        </div>
                    </Stack>

                    <div className="w-full">
                        <Card radius="xl" padding={0} withBorder className="overflow-hidden bg-[#1a202e]/70">
                            <Text fw={600} c="white" size="lg" p="md" className="bg-[#1f2937]">
                                Manzil
                            </Text>
                            {mapUrl ? (
                                <Image
                                    src={mapUrl}
                                    alt="Kutubxona manzili"
                                    radius={0}
                                    height={450}
                                    fit="cover"
                                />
                            ) : (
                                <Center h={450} className="bg-[#1a202e]">
                                    <Text c="gray.5">Xarita ma'lumotlari mavjud emas</Text>
                                </Center>
                            )}
                        </Card>
                    </div>
                </Group>

                <Stack mt="xl">
                    <Title order={3} fw={700} c="white">
                        Kutubxonadagi kitoblar
                    </Title>

                    <div className="w-full overflow-x-auto bg-[#0f172a]/70 rounded-xl p-4">
                        <Table className="min-w-[800px] border-separate border-spacing-y-2">
                            <Table.Thead>
                                <Table.Tr className="bg-[#1f2937] text-gray-300">
                                    <Table.Th className="text-left px-4 py-3 font-semibold">Kitob nomi</Table.Th>
                                    <Table.Th className="text-left px-4 py-3 font-semibold">Muallif</Table.Th>
                                    <Table.Th className="text-left px-4 py-3 font-semibold">Nashriyot</Table.Th>
                                    <Table.Th className="text-left px-4 py-3 font-semibold">Soni</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {books.length > 0 ? (
                                    books.map((book) => (
                                        <Table.Tr
                                            key={book.id}
                                            className="bg-[#1a202e] hover:bg-[#1f2937] transition-colors rounded-lg h-14"
                                        >
                                            <Table.Td className="text-white px-4">{book.name}</Table.Td>
                                            <Table.Td className="text-gray-300 px-4">{book.author}</Table.Td>
                                            <Table.Td className="text-gray-300 px-4">{book.publisher}</Table.Td>
                                            <Table.Td className="px-4">
                                                <Badge color="green" variant="light" radius="xl">
                                                    {book.quantity_in_library} ta
                                                </Badge>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                ) : (
                                    <Table.Tr>
                                        <Table.Td colSpan={4} className="text-center py-8 text-gray-500">
                                            Kitoblar mavjud emas
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    </div>
                </Stack>
            </div>
        </Container>
    );
};

export default LibraryDetail;