import { useState, useRef } from "react";
import { Container, FloatingIndicator, Skeleton, Table, Tabs } from "@mantine/core";
import classes from "./Books.module.css";
import { useTranslation } from "react-i18next";
import AllBooks from "./AllBooks";
import LikedBooks from "./LikedBooks";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import SortedBooks from "./SortedBooks";
import authStore from "../../store/authStore";
import { IconSearch, IconX } from "@tabler/icons-react";

const Books = () => {
  const { t } = useTranslation()
  const rootRef = useRef(null);
  const controlsRefs = useRef({});
  const [value, setValue] = useState("1");
  const [search, setSearch] = useState("");

  const { likedBooks } = authStore();

  const setControlRef = (val) => (node) => {
    if (node) controlsRefs.current[val] = node;
  };

  const { data: allBooks, isLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await API.get("/books/books/")

      return res.data
    },
    select: (books) => {
      return [...books].sort((a, b) => {
        const aLiked = likedBooks[a.id]
        const bLiked = likedBooks[b.id]

        if (aLiked && !bLiked) return -1;
        if (!aLiked && bLiked) return 1;
        return 0;
      })
    }
  })


  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto bg-[#0b111b] rounded-xl shadow-lg p-4">
        <Table className="min-w-[800px] border-separate border-spacing-y-3">
          <Table.Thead>
            <Table.Tr className="bg-[#1f2937] text-gray-300 sticky top-0 z-20">
              <Table.Th className="w-10"></Table.Th>
              <Table.Th className="text-left px-4 py-3 font-semibold">{t("books.nameBooks")}</Table.Th>
              <Table.Th className="text-left px-4 py-3 font-semibold">{t("books.author")}</Table.Th>
              <Table.Th className="text-left px-4 py-3 font-semibold">{t("books.publisher")}</Table.Th>
              <Table.Th className="text-left px-4 py-3 font-semibold">{t("books.totalCount")}</Table.Th>
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
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between  mt-8">
        <Tabs variant="none" value={value} onChange={setValue} className="w-[100%]">
          <div className="flex items-center justify-between ">
            <Tabs.List ref={rootRef} className={classes.list}>
              <Tabs.Tab
                value="1"
                ref={setControlRef("1")}
                className={classes.tab}
              >
                {t("books.allBooks")}
              </Tabs.Tab>
              <Tabs.Tab
                value="2"
                ref={setControlRef("2")}
                className={classes.tab}
              >
                {t("common.likeBook")}
              </Tabs.Tab>
              <Tabs.Tab
                value="3"
                ref={setControlRef("3")}
                className={classes.tab}
              >
                A-Z
              </Tabs.Tab>
              <Tabs.Tab
                value="4"
                ref={setControlRef("4")}
                className={classes.tab}
              >
                Z-A
              </Tabs.Tab>
              <FloatingIndicator
                target={value ? controlsRefs.current[value] : null}
                parent={rootRef.current}
                className={classes.indicator}
              />
            </Tabs.List>

            <div className="flex items-center justify-end w-full max-w-md">
              <div className="relative group">
                <input
                  type="text"
                  placeholder={t("common.search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full md:w-[300px] lg:w-[380px] pl-12 pr-10 py-3 
                 bg-gray-800/50 backdrop-blur-md 
                 border border-gray-700/50 rounded-xl 
                 text-white placeholder-gray-500 
                 outline-none 
                 transition-all duration-300 
                 focus: border-gray-700/50 focus:shadow-lg focus:shadow-indigo-500/20 
                 focus:bg-gray-800/80"
                />

                <IconSearch
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 
                 group-focus-within:text-indigo-400 
                 transition-colors duration-300"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 
                   text-gray-500 hover:text-white 
                   transition-colors duration-200"
                  >
                    <IconX size={20} />
                  </button>
                )}

                <div className="absolute inset-0 -z-10 rounded-xl opacity-0 group-focus-within:opacity-100 
                    bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl 
                    transition-opacity duration-500" />
              </div>
            </div>
          </div>
          <Tabs.Panel value="1" className="p-4">
            <AllBooks allBooks={allBooks} search={search} />
          </Tabs.Panel>
          <Tabs.Panel value="2" className="p-4">
            <LikedBooks allBooks={allBooks} search={search} />

          </Tabs.Panel>
          <Tabs.Panel value="3" className="p-4">
            <SortedBooks type="az" allBooks={allBooks} search={search} />
          </Tabs.Panel>

          <Tabs.Panel value="4" className="p-4">
            <SortedBooks type="za" allBooks={allBooks} search={search} />
          </Tabs.Panel>
        </Tabs>

      </div>

    </Container>
  );
};

export default Books;