import { useQuery } from "@tanstack/react-query";
import { Button, Container, Flex, Loader } from "@mantine/core";
import { FaRegUserCircle, FaPhoneAlt } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import authStore from "../../store/authStore";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
import { API } from "../../api/api";

const Profile = () => {
  const { t } = useTranslation();
  const { logout } = authStore();

  const { data: profileM, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/admin/profile/").then((res) => res.data),
  });

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center h-screen bg-[#1e1f29]">
        <Loader size="xl" variant="dots" color="#8b5cf6" />
      </Container>
    );
  }

  const openModal = () =>
    modals.openConfirmModal({
      title: t("profile.logoutConfirm"),
      labels: { confirm: t("common.yes"), cancel: t("common.no") },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => logout(),
    });

  const handleLogOutFunction = () => openModal();

  return (
    <Container className="max-w-4xl mt-10 p-6 bg-[#0b111b] rounded-xl shadow-lg">
      <div className="px-8">
        <div className="border-b border-gray-600 pb-6">
          <Flex justify={"space-between"} align={"center"}>
            <div className="w-[130px] h-[130px] rounded-full bg-[#3a3c50] flex items-center justify-center">
              <FaRegUserCircle className="w-[70px] h-[70px] text-[#161530] " />
            </div>

            <Flex gap="md">
              <Button
                onClick={handleLogOutFunction}
                color="red"
                className="hover:bg-red-600 hover:text-white transition-colors"
              >
                {t("common.logout")}
              </Button>
            </Flex>
          </Flex>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <div className="flex items-center gap-4 bg-[#3a3c50] rounded-lg p-4 shadow-sm hover:bg-[#4b4d64] transition-colors">
            <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#161530] rounded-lg text-white">
              <ImUserTie className="w-[26px] h-[26px]" />
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-semibold">{t("common.name")}</h2>
              <p className="text-white text-lg font-medium">{profileM?.name || "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#3a3c50] rounded-lg p-4 shadow-sm hover:bg-[#4b4d64] transition-colors">
            <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#161530] rounded-lg text-white">
              <FaPhoneAlt className="w-[26px] h-[26px]" />
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-semibold">{t("common.phone")}</h2>
              <p className="text-white text-lg font-medium">{profileM?.phone || "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#3a3c50] rounded-lg p-4 shadow-sm hover:bg-[#4b4d64] transition-colors">
            <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#161530] rounded-lg text-white">
              <FaRegUserCircle className="w-[26px] h-[26px]" />
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-semibold">Role</h2>
              <p className="text-white text-lg font-medium">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
