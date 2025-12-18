import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./Library.module.css";
import { Container, FloatingIndicator, Tabs } from "@mantine/core";
import LibraryFiltered from "./LibraryFiltered";
import { IconSearch, IconX } from "@tabler/icons-react";

const Libraries = () => {
  const { t } = useTranslation()
  const rootRef = useRef(null)
  const controlsRefs = useRef({})
  const [value, setValue] = useState("1")
  const [search, setSearch] = useState("");

  const setControlRef = (val) => (node) => {
    if (node) controlsRefs.current[val] = node;
  };

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
                {t("libraries.active")}
              </Tabs.Tab>
              <Tabs.Tab
                value="2"
                ref={setControlRef("2")}
                className={classes.tab}
              >
                {t("libraries.inactive")}
              </Tabs.Tab>
              <Tabs.Tab
                value="3"
                ref={setControlRef("3")}
                className={classes.tab}
              >
                {t("common.likeBook")}
              </Tabs.Tab>
              <Tabs.Tab
                value="4"
                ref={setControlRef("4")}
                className={classes.tab}
              >
                {t("libraries.manyBooks")}
              </Tabs.Tab>

              <Tabs.Tab
                value="5"
                ref={setControlRef("5")}
                className={classes.tab}
              >
                A-Z
              </Tabs.Tab>
              <Tabs.Tab
                value="6"
                ref={setControlRef("6")}
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
          <Tabs.Panel value="1" className="mt-10">
            <LibraryFiltered search={search} type="active" />
          </Tabs.Panel>
          <Tabs.Panel value="2" className="mt-10">
            <LibraryFiltered search={search} type="inactive" />
          </Tabs.Panel>
          <Tabs.Panel value="3" className="mt-10">
            <LibraryFiltered search={search} type="like" />
          </Tabs.Panel>
          <Tabs.Panel value="4" className="mt-10">
            <LibraryFiltered search={search} type="many_books" />
          </Tabs.Panel>
          <Tabs.Panel value="5" className="mt-10">
            <LibraryFiltered search={search} type="az" />
          </Tabs.Panel>
          <Tabs.Panel value="6" className="mt-10">
            <LibraryFiltered search={search} type="za" />
          </Tabs.Panel>
        </Tabs>

      </div>

    </Container>
  );
};

export default Libraries;
