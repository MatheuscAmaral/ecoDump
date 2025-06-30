import { CircleUserRound, LogOut  } from "lucide-react";
import logo from "@/assets/sidebarLogo.png";
import { getCurrentUser, type User } from "@/utils/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { handleLogout } from "@/utils/handleLogOut";
import { items } from "@/data/pages";

const AppSidebar = () => {
  const currentUser: User | null = getCurrentUser();
  const username = currentUser?.username || "Usuário";
  const userLevel = currentUser?.level || "user";

  return (
    <Sidebar>
      <SidebarHeader>
        <img src={logo} alt="logo" className=" w-44 py-2" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="text-black"/>
                      <span className="text-black">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator/>
        <div className="flex justify-between items-center p-2">
            <div className="flex items-center gap-2">
                <CircleUserRound className="size-5" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{username}</span>
                  {userLevel === 'admin' && (
                    <span className="text-xs text-gray-500 capitalize">Admin</span>
                  )}
                </div>
            </div>
            <LogOut 
              className="size-4 cursor-pointer hover:text-gray-500 transition-colors"
              onClick={handleLogout}
            />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;