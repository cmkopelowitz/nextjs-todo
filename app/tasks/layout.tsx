import NavigationMenu from "@/components/NavigationMenu";
import { Providers } from "./Providers";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <div className="flex">
                <NavigationMenu />
                {children}
            </div>
        </Providers>
    );
}
