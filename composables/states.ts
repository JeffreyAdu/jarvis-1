import { type iMessage } from "~/interfaces/iMessage";

export const useIsChatting = () => useState("isChatting", () => false);
export const useMessages = () => useState<iMessage[]>("message", () => []);