import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { queryClient } from "../../main";
import { Badge, Button, Center, Image, Popover, Skeleton, Stack, Table, Text, Tooltip } from "@mantine/core";
import { HiDotsHorizontal } from "react-icons/hi";
import authStore from "../../store/authStore";
import { IconHeartFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const LibraryFiltered = ({ type, search }) => {
    const { likedLibrary, toggleLikedLibrary } = authStore();
    const { t } = useTranslation()

    const { data: libraries, isLoading } = useQuery({
        queryKey: ["libraries"],
        queryFn: async () => {
            const res = await API.get("/libraries/libraries/");
            return res.data;
        },
    });

    const filteredLibrary = libraries
        ?.filter((item) => {

            const dataSearch = item.name.toLowerCase().includes(search.toLowerCase())

            if (!dataSearch) return false;

            if (type === "active") return item.is_active;
            if (type === "inactive") return !item.is_active;
            if (type === "like") return likedLibrary[item.id];
            return true;
        })
        .sort((a, b) => {
            const aLiked = likedLibrary[a.id]
            const bLiked = likedLibrary[b.id]

            if (aLiked && !bLiked) return -1;
            if (!aLiked && bLiked) return 1;

            if (type === "many_books") return b.total_books - a.total_books;
            if (type === "az") return a.name.localeCompare(b.name);
            if (type === "za") return b.name.localeCompare(a.name);
            return 0;
        });

    const { mutate: deactive } = useMutation({
        mutationFn: async (id) =>
            API.patch(`/libraries/library/deactivate/${id}/`, { is_active: false }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["libraries"] }),
    });

    const { mutate: activate } = useMutation({
        mutationFn: async (id) =>
            API.patch(`/libraries/library/activate/${id}/`, { is_active: true }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["libraries"] }),
    });


    if (isLoading) {
        return (
            <div className="w-full overflow-x-auto bg-[#0b111b] rounded-xl shadow-lg p-4">
                <Table className="min-w-[800px] border-separate border-spacing-y-3">
                    <Table.Thead>
                        <Table.Tr className="bg-[#1f2937] text-gray-300 sticky top-0 z-20">
                            <Table.Th className="w-10"></Table.Th>
                            <Table.Th className="text-left px-4 py-3 font-semibold">{t("libraries.library")}</Table.Th>
                            <Table.Th className="text-left px-4 py-3 font-semibold">{t("libraries.status")}</Table.Th>
                            <Table.Th className="text-left px-4 py-3 font-semibold">{t("libraries.address")}</Table.Th>
                            <Table.Th className="text-left px-4 py-3 font-semibold">{t("libraries.totalBooks")}</Table.Th>
                            <Table.Th className="w-12 text-center font-semibold">{t("libraries.actions")}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {[...Array(10)].map((_, i) => (
                            <Table.Tr key={i} className="bg-[#1a202e] rounded-lg h-16">
                                <Table.Td className="text-center">
                                    <Skeleton circle height={20} width={20} />
                                </Table.Td>
                                <Table.Td>
                                    <Skeleton height={20} width="70%" radius="md" />
                                </Table.Td>
                                <Table.Td>
                                    <Skeleton height={28} width={90} radius="xl" />
                                </Table.Td>
                                <Table.Td>
                                    <Skeleton height={18} width="85%" radius="md" />
                                </Table.Td>
                                <Table.Td>
                                    <Skeleton height={20} width={60} radius="md" />
                                </Table.Td>
                                <Table.Td className="text-center">
                                    <Skeleton circle height={25} width={25} />
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </div>
        );
    }


    if (!filteredLibrary || filteredLibrary.length === 0) {
        let message = "Hozircha kutubxona mavjud emas";
        if (search) {
            message = `"${search}" bo'yicha natija topilmadi`;
        } else if (type === "like") {
            message = "Hozircha sevimli kutubxona yo'q";
        } else if (type === "active") {
            message = "Faol kutubxona mavjud emas";
        } else if (type === "inactive") {
            message = "Nofaol kutubxona mavjud emas";
        }

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
                        {message}
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
                        <Table.Th className="text-left px-4 py-3 font-semibold">{t("libraries.library")}</Table.Th>
                        <Table.Th className="text-left px-4 py-3 font-semibold">{t("libraries.status")}</Table.Th>
                        <Table.Th className="text-left px-4 py-3 font-semibold">{t("libraries.address")}</Table.Th>
                        <Table.Th className="text-left px-4 py-3 font-semibold">{t("libraries.totalBooks")}</Table.Th>
                        <Table.Th className="w-12 text-center font-semibold">{t("libraries.actions")}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {filteredLibrary?.map((library) => (
                        <Table.Tr
                            key={library.id}
                            className="bg-[#1a202e] hover:bg-[#1f2937] transition-colors duration-200 rounded-lg h-16 shadow-sm"
                        >
                            <Table.Td className="text-center cursor-pointer">
                                <Tooltip label="Sevimli kutubxona" position="top" withArrow>
                                    <IconHeartFilled
                                        color={likedLibrary[library.id] ? "red" : "#6b7280"}
                                        className="w-5 h-5 transition-transform hover:scale-125"
                                        onClick={() => toggleLikedLibrary(library)}
                                    />
                                </Tooltip>
                            </Table.Td>

                            <Table.Td className="text-white px-4">{library.name}</Table.Td>
                            <Table.Td>
                                <Badge
                                    variant="outline"
                                    color={library.is_active ? "green" : "red"}
                                    radius="xl"
                                    className={`px-3 py-1 text-sm font-medium border ${library.is_active ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                                        }`}
                                >
                                    {library.is_active ? t("common.active") : t("common.inactive")}
                                </Badge>
                            </Table.Td>
                            <Table.Td className="text-gray-400 px-4 truncate max-w-[300px]">
                                {library.address}
                            </Table.Td>
                            <Table.Td className="text-white px-4">{library.total_books} {t("common.piece")}</Table.Td>

                            <Table.Td className="text-center">
                                <Popover width={140} position="bottom" withArrow shadow="md" trapFocus>
                                    <Popover.Target>
                                        <HiDotsHorizontal className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                                    </Popover.Target>
                                    <Popover.Dropdown className="bg-[#0b111b] p-2 rounded-md border border-gray-700 flex flex-col gap-1">
                                        {!library.is_active ? (
                                            <Button
                                                onClick={() => activate(library.id)}
                                                variant="subtle"
                                                size="xs"
                                                fullWidth
                                                className="hover:bg-green-700"
                                            >
                                                {t("common.activate")}
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => deactive(library.id)}
                                                variant="subtle"
                                                color="red"
                                                size="xs"
                                                fullWidth
                                                className="hover:bg-red-700"
                                            >
                                                {t("common.deactivate")}
                                            </Button>
                                        )}
                                    </Popover.Dropdown>
                                </Popover>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    );
};

export default LibraryFiltered;
