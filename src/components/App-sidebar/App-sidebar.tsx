// import { productCategories, themes } from "@/utils/SidebarDummyData"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Checkbox } from "@/components/ui/checkbox"  
import { Label } from "@radix-ui/react-label"
import SidebarMenuItemsDummyData from "../SidebarMenuItemes/SidebarMenuItems"




export function AppSidebar() {
    return (
        <>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>

                            <SidebarMenu className="py-16">

                                            {/* saeid */}
                                   <SidebarMenuItemsDummyData></SidebarMenuItemsDummyData>

                                {/* **************** (Saeid) old / dirty way *************** */}
                                {/* <h1 className="text-3xl ps-3">
                                    Fliters
                                </h1>
                                {productCategories.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton asChild>
                                            <div>
                                                <Checkbox id={item.name} />

                                                <Label htmlFor={item.name}>
                                                    <span >{item.name}</span>
                                                    <span className="text-neutral-500"> ({item.count})</span>
                                                </Label>
                                            </div>

                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                                <h1 className="text-3xl ps-3">
                                    Themes
                                </h1>
                                {themes.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton asChild>
                                            <div>
                                                <Checkbox id={item.name} />

                                                <Label htmlFor={item.name}>
                                                    <span >{item.name}</span>
                                                    <span className="text-neutral-500"> ({item.count})</span>
                                                </Label>
                                            </div>

                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))} */}
                            </SidebarMenu>

                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </>
    )
}