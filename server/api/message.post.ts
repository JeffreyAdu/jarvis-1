import { client, assistant } from "../utils/openai";
import { getLatestMessages } from "../utils/get-message";

export default defineEventHandler(async (event) => {
    const threadID = getCookie(event, "thread-id");

    if (!threadID ) {
        return;
    }

    const queryParams = getQuery(event);
    // create function allows us to add a meeasge to a thread 
    await client.beta.threads.messages.create(threadID, {
        role: "user",
        content: queryParams.message?.toString() ?? "",
    });


    //Let the assitant do its response work within the specific thread
    const run = await client.beta.threads.runs.create(threadID, {
        assistant_id: assistant,
    })

    return await getLatestMessages(threadID, run.id);

})