import { getLatestMessages } from "../utils/get-message"

export default defineEventHandler( async (event) => {
    //to access a message from the thread , we are going to need the id from a thread and runner 
    const threadID = getCookie(event, "thread-id");
    const runID = getCookie(event, "run-id");

    if ( !threadID || !runID){
        return;
    }

    return await getLatestMessages(threadID, runID);

});