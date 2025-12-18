import { HiOutlineMenu } from "react-icons/hi";
import { API } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { FaBook } from "react-icons/fa6";
import { Select } from "@mantine/core";

const Header = ({ toggleSidebar }) => {
  const { i18n } = useTranslation();
  const { data: profileM } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/admin/profile/").then((res) => res.data),
  });

  function handleChangeSelectLanguage(value) {
    i18n.changeLanguage(value);
  }

  return (
    <div className="flex items-center justify-between h-full px-16">
      <div className="flex items-center gap-[50px]">
        <div className="text-[28px] font-bold flex items-center gap-2.5">
          <FaBook />
          xona
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 mr-4 rounded hover:bg-gray-700 transition-colors"
          title="Sidebar'ni ochish/yopish"
        >
          <HiOutlineMenu className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Select
          value={i18n.language}
          onChange={handleChangeSelectLanguage}
          data={[
            { value: "uz", label: "Uzb" },
            { value: "ru", label: "Рус" },
            { value: "en", label: "Eng" },
          ]}
          placeholder="Tilni tanlang"
          styles={{
            input: {
              width: "80px",
              backgroundColor: "#1f2937",
              color: "white",
              borderColor: "#4b5563",
              "&:hover": { borderColor: "#3b82f6" },
            },
            // item: {
            //   backgroundColor: "#1f2937",
            //   color: "white",
            //   "&[data-selected]": { backgroundColor: "#1f2937", color: "white" },
            //   "&[data-hovered]": { backgroundColor: "#1f2937", color: "white" },
            // },
          }}
          radius="lg"
          size="sm"
        />

        <div className="flex gap-2 items-center text-white">
          <HiMiniUserCircle className="text-[30px]" />
          <h1 className="font-medium">{profileM?.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
