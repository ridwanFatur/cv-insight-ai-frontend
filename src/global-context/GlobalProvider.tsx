import { type ReactNode } from "react"
import { GlobalContext, useGlobalState } from "./global-state"

export default function GlobalProvider({ children }: { children: ReactNode }) {
	return <GlobalContext.Provider value={useGlobalState()}>{children}</GlobalContext.Provider>
}