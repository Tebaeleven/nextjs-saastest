import React from "react";
import { CustomNextPage } from "@/types/custom-next-page";

const Secret: CustomNextPage = () => {
    return <p className="text-4xl">Secret:認証が必要なページ</p>;
};

export default Secret;
Secret.requireAuth=true