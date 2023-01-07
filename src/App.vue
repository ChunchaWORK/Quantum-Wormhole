<template>
    <VApp :theme="isDark ? 'dark' : 'light'">
        <VAppBar elevation="2">
            <VAppBarNavIcon icon="mdi-github" @click.stop="appbar_github_btn_onClick">
            </VAppBarNavIcon>

            <VAppBarTitle>
                Quantum-Wormhole
            </VAppBarTitle>

            <VSpacer></VSpacer>

            <VBtn icon @click.stop="toggleDark()">
                <VIcon>{{ isDark? 'mdi-white-balance-sunny': 'mdi-weather-night' }}</VIcon>
            </VBtn>
        </VAppBar>

        <VMain class="ma-6 d-flex" id="main">
            <VCard elevation="16" class="h-100 w-100 pa-4">
                <div class="d-flex justify-center pa-2">
                    <canvas height="300" width="300" style="background-color: rgba(,,,);"></canvas>
                </div>
                <VForm v-model="form_vaild" ref="form" class="w-75 mx-auto py-10 align-center"
                    @submit="form_check($event)">
                    <VTextField v-model="form_name" :rules="form_name_rules" prepend-inner-icon="mdi-account"
                        counter="20" label="名称" reqiuired>
                    </VTextField>
                    <div class="d-flex justify-center">
                        <VBtn color="success" class="w-25" @click.stop="form_check">
                            <VIcon>mdi-repeat</VIcon>
                            生成
                        </VBtn>
                    </div>
                </VForm>
            </VCard>
        </VMain>

        <VDialog persistent v-model="dialog" transition="slide-y-reverse-transition">
            <VCard min-height="250">
                <VToolbar color="error">
                    <VCardTitle>
                        <VIcon>mdi-close</VIcon>
                        未获得 Apple 认证的设备
                    </VCardTitle>
                </VToolbar>
                <VCardText>
                    使用 <VIcon>mdi-apple</VIcon> 设备以获得最佳体验。
                </VCardText>
                <VFooter absolute class="py-0">
                    <VCheckbox hide-details v-model="dialog_checkbox" :disabled="dialog_checkbox" label="继续弹出">
                    </VCheckbox>
                    <VSpacer></VSpacer>
                    <VBtn :hidden="!dialog_checkbox" color="red" @click.stop="dialog_close">好</VBtn>
                </VFooter>
            </VCard>
        </VDialog>
    </VApp>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { WormholeCanvas } from "./wormholeCanvas";
import { getHash } from "./tools";

const appbar_github_btn_onClick = () => {
    window.open('https://github.com/HelloGwkki/Quantum-Wormhole', '_blank');
}

const form = ref();
const form_vaild = ref(false);
const form_name = ref("");
const form_name_rules = [
    (v: String) => !!v || '必填项',
    (v: String) => (v && v.length <= 20) || 'ERR_NAME_IS_TOO_LONG::差不多得了',
];
const form_check = async (e: Event) => {
    e.preventDefault();
    const { valid } = await form.value.validate();
    if (valid) {
        const canvas_obj = new WormholeCanvas();
        canvas_obj.seed = getHash(form_name.value);
        canvas_obj.wormhole();
    }
}

const dialog = ref(false);
const dialog_checkbox = ref(false);
const dialog_close = () => {
    dialog.value = false;
}

const isDark = useDark();
const toggleDark = useToggle(isDark);

onMounted(() => {
    if (!navigator.userAgent.match(/\(i[^;]+;( U);? CPU.+Mac OS X/)) {
        dialog.value = true;
    }
});

</script>

<style>
@import url("@mdi/font/css/materialdesignicons.min.css");

::-webkit-scrollbar {
    display: none;
}
</style>
