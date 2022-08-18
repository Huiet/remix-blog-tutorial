import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { GlobalNav } from "~/components/GlobalNav";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

// @ts-ignore
export function Document({ children }) {
  return (
    <html lang="en">
    <head>
      <Meta />
      <Links />
    </head>
    <body className="h-full dark:bg-bodyDark dark:text-textDark">
      {children}
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    {/*Enable live reload in development environment only, not production */}
    {/*{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}*/}
    </body>
    </html>
  )
}

// @ts-ignore
export function Layout({ children }) {
  return (
    <>
      <GlobalNav />
      {children}
    </>
  )
}

// @ts-ignore
export function ErrorBoundary({ error }) {
  console.log(error)
  return (
    <Document>
      <Layout>
        <h1>There was an Error</h1>
        <p>{error?.message}</p>
      </Layout>
    </Document>
  )
}

// export default function App() {
//   return (
//     <html lang="en" className="h-full">
//       <head>
//         <Meta />
//         <Links />
//       </head>
//       <body className="h-full dark:bg-bodyDark dark:text-textDark">
//         <Outlet />
//         <ScrollRestoration />
//         <Scripts />
//         <LiveReload />
//       </body>
//     </html>
//   );
// }
