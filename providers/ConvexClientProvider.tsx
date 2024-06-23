"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <ClerkProvider
            appearance={{
                elements: {
                    cardBox: { boxShadow: 'none' },
                    card: { boxShadow: 'none' },
                    footer: { background: '#fff' },
                    formButtonPrimary: {
                        padding: "8px 28px",
                        background: "#216D66",
                        "&:hover": {
                            background: "#216D66",
                            opacity: 90
                        },
                        boxShadow: 'none !important',
                        fontSize: '16px',
                        borderRadius: "50px"
                    },
                    organizationSwitcherTrigger: {
                        padding: '8px',
                        width: '100%',
                        justifyContent: 'left',
                        "&:focus-within" : { background: '#fff'}
                    },
                    avatarBox: { width: '32px', height: '32px' },
                    organizationPreviewMainIdentifier: { fontSize: '16px' },
                    organizationSwitcherTriggerIcon: { marginLeft: 'auto' }
                }
            }}
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}