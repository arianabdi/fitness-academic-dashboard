import React from "react";
import { Link } from "react-router-dom";
import { Block, BlockContent, Button } from "../../../components/Component";

const Error404Classic = () => {
  return (
    <>
      <Block className="nk-block-middle wide-xs mx-auto">
        <BlockContent className="nk-error-ld text-center">
          <h1 className="nk-error-head">404</h1>
          <h3 className="nk-error-title">صفحه ی مورد نظر یافت نشد</h3>
          <p className="nk-error-text">
            ما برای بوجود آمدن این مشکل بسیار متاسفیم. به نظر می رسد سعی می کنید به صفحه ای دسترسی پیدا کنید که یا حذف شده یا هرگز وجود نداشته است
          </p>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <Button color="primary" size="lg" className="mt-2">
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        </BlockContent>
      </Block>
    </>
  );
};
export default Error404Classic;
