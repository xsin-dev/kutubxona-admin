import authStore from "../../store/authStore";
import { Badge, Stack, Table, Text, Tooltip } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SortedBooks = ({ type, allBooks, search }) => {
    const { likedBooks, toggleLiked } = authStore();
    const navigate = useNavigate()
    const { t } = useTranslation()


    const filteredBooks = allBooks
        ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
            const aLiked = likedBooks[a.id];
            const bLiked = likedBooks[b.id];

            if (aLiked && !bLiked) return -1;
            if (!aLiked && bLiked) return 1;

            if (type === "az") return a.name.localeCompare(b.name);
            if (type === "za") return b.name.localeCompare(a.name);

            return 0;
        });

    if (!filteredBooks || filteredBooks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] bg-gray-900 rounded-xl shadow-lg p-6">
                <Stack gap="sm" align="center">
                    <Text
                        // size="2xl"
                        fw={700}
                        c="white"
                        className="text-center"
                        style={{ letterSpacing: "0.5px", fontSize: "25px" }}
                    >
                        Kitob mavjud emas
                    </Text>

                    {search && (
                        <Text
                            size="md"
                            c="gray.5"
                            className="text-center opacity-80 animate-fadeIn delay-150"
                        >
                            Boshqa so'z bilan qidirib ko'ring
                        </Text>
                    )}

                    <div className="mt-4 w-[80px] h-[4px] bg-indigo-500 rounded-full animate-pulse" />
                </Stack>
            </div>

        );
    }

    return (
        <div className="w-full overflow-x-auto bg-[#0b111b] rounded-xl shadow-lg p-4">
            <Table className="min-w-[800px] border-separate border-spacing-y-2">
                <Table.Thead>
                    <Table.Tr className="bg-[#1f2937] text-gray-300 sticky top-0 z-20 rounded-t-xl">
                        <Table.Th className="w-10"></Table.Th>
                        <Table.Th className="text-left px-4 py-3 font-semibold">{t("books.nameBooks")}</Table.Th>
                        <Table.Th className="text-left px-4 py-3 font-semibold">{t("books.author")}</Table.Th>
                        <Table.Th className="text-left px-4 py-3 font-semibold">{t("books.publisher")}</Table.Th>
                        <Table.Th className="text-left px-4 py-3 font-semibold">{t("books.totalCount")}</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {filteredBooks.map((book) => (
                        <Table.Tr
                            key={book.id}
                            className="bg-[#1a202e] hover:bg-[#1f2937] transition-colors duration-200 rounded-lg h-16 shadow-sm"
                        >
                            <Table.Td className="text-center cursor-pointer">
                                <Tooltip label="Sevimli kitob" position="top" withArrow>
                                    <IconHeartFilled
                                        color={likedBooks[book.id] ? "red" : "#6b7280"}
                                        className="w-5 h-5 transition-transform hover:scale-125"
                                        onClick={() => toggleLiked(book)}
                                    />
                                </Tooltip>
                            </Table.Td>

                            <Table.Td className="text-gray-300 px-4 cursor-pointer hover:text-white transition-colors"
                                onClick={() => navigate(`/book/${book.id}`)}>{book.name}</Table.Td>
                            <Table.Td className="text-gray-300 px-4">{book.author}</Table.Td>
                            <Table.Td className="text-gray-300 px-4">{book.publisher}</Table.Td>

                            <Table.Td className="px-4">
                                <Badge
                                    variant="outline"
                                    color="green"
                                    radius="xl"
                                    className="px-3 py-1 text-sm font-medium border border-green-500 text-green-500 bg-transparent"
                                >
                                    {book.quantity_in_library} {t("common.copy")}
                                </Badge>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    );
};

export default SortedBooks;
