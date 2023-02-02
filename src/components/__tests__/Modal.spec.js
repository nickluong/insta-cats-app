// import { describe, it, expect, test } from "vitest";
import { expect } from "vitest";
import Modal from "../Modal.vue";
import { mount } from "@vue/test-utils"

describe('Modal', () => {
    test("mount signup modal", async()=> {
        const wrapper = mount(Modal, {
            props: {
                type: "signup" 
            },
        });
        expect(wrapper.text()).toContain("Register Email")
        expect(wrapper.find("saveButton").exists()).toBeFalsy();
    });
    
    test("mount upload modal", async()=> {
        const wrapper = mount(Modal, {
            props: {
                type: "upload" 
            },
        });
        expect(wrapper.text()).toContain("Upload Post")
        expect(wrapper.find("uploadButton").exists()).toBeFalsy();
    });
})
