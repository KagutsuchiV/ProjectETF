 /* eventBus.js */
import { ref } from 'vue';
export const eventBus = ref(new EventTarget());
export const eventBusSale =ref(new EventTarget());
export const eventBusAnalysis=ref(new EventTarget());
export const eventBusPhoto=ref(new EventTarget());