import React from "react";

const Secret = () => {
    return <p className="text-4xl">Secret:認証が必要なページ</p>;
};

export default Secret;
Secret.requireAuth = true;
