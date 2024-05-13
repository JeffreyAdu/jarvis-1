<template>
    <section class="flex flex-col min-w-[520px] w-full">
          <!-- Customer Support Agent -->
          <div class="flex items-center gap-3.5 pb-4 border-b border-dashed">
            <div>
              <div
                class="w-12 h-12 overflow-hidden rounded-full image-fit border-2 border-slate-200/70"
              >
                <img src="/bruno.svg" />
              </div>
            </div>
            <div>
              <div class="font-medium truncate max-w-[9rem] md:max-w-none">
                Jarvis
              </div>
              <div
                class="text-slate-500 mt-0.5 truncate max-w-[9rem] md:max-w-none"
              >
                Algonquin Support Agent
              </div>
            </div>
          </div>

          <!-- Messages -->
          <div class="text-center text-2xl py-12" v-if="pending">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 24" class="w-12 h-12 mx-auto">
              <!-- Three dots with pulsating and fading animations and green color -->
              <circle cx="6" cy="12" r="1.5" class="fill-current text-green-500 animate-scale-up-down animate-fade-in-out" style="animation-delay: -0.6s;"></circle>
              <circle cx="12" cy="12" r="1.5" class="fill-current text-green-500 animate-scale-up-down animate-fade-in-out" style="animation-delay: -0.3s;"></circle>
              <circle cx="18" cy="12" r="1.5" class="fill-current text-green-500 animate-scale-up-down animate-fade-in-out"></circle>
            </svg>
          </div>

          <div
            ref="container"
            v-else
            class="flex flex-col gap-3.5 py-5 px-3 overflow-y-scroll max-h-[400px]"
          >
            <!-- To flip message use "flex-row-reverse" -->
            <div v-for="message in messages" class="flex items-end gap-3" :class="{ 'flex-row-reverse': !message.isBruno }">
              <!-- Profile Image -->
              <img
                v-if="message.isBruno"
                class="block w-12 h-12 overflow-hidden rounded-full border-2 border-slate-200/70"
                src="/bruno.svg"
              />
              <!-- Text Image -->
              <div
                v-else 
                class="flex uppercase items-center justify-center text-xl text-center text-white font-bold bg-gradient-to-t from-sky-500 to-emerald-500 w-12 h-12 overflow-hidden rounded-full border-2 border-slate-200/70"
              >
                {{ customerInitials  }}
              </div>
              <!-- Main Content -->
              <div
                class="w-3/5 flex flex-col gap-2 border px-4 pt-3 pb-4 rounded-xl bg-slate-50/80 border-slate-200/80"
              >
                <!-- Message Content -->
                <div v-if="message.isBruno" v-html="message.message"></div>
                <div v-else>
                  {{ message.message }}
                </div>
                <!-- Time -->
                <div class="text-xs text-slate-500/70">{{ message.timestamp }}</div>
              </div>
            </div>

          </div>
          
          <MessageForm v-if="!pending"/>
    </section> 
</template>


<script setup lang="ts">
import { type Message } from 'openai/resources/beta/threads/messages.mjs';
const messages = useMessages();
const { customerInitials } = useCustomer(); 
const container = ref();

onUpdated(() => {
  //We grab the element and set its scroll position to the height of out element 
  container.value.scrollTop = container.value.scrollHeight;
}) 

const { pending } = await useFetch("/api/message", {
  lazy: true,
  onResponse({ response }){
    //When retrieving multiple messages, they may be stored from latest to oldest, hence we need to reverese the array to prevent this : reverse() 
    response._data.data.reverse().forEach((element: Message) => {
        const content = element.content[0];

        if (content?.type == "text") {
          messages.value.push({
            name: element.role == "assistant" ? "Jarvis" : customerInitials.value,
            isBruno: element.role == "assistant" ? true : false,
            message: content.text.value,
            timestamp: new Date().toLocaleString([], {
              timeStyle: "short",
            })
          })
        }
    });
   
  }
});


</script>