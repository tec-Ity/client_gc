import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProdList from "../../component/prodList/ProdList";
import { ReactComponent as BackArrow } from "../../component/icon/chevron-left.svg";
import { useHistory } from "react-router-dom";
import CustomButton from "../../component/global/modal/component/CustomButton";
import { fetchSearchProds } from "../../redux/shop/shopSlice";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles((theme) => ({}));
export default function SearchPage() {
  const hist = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchProds = useSelector((state) => state.shop.searchProds);
  const searchProdsCount = useSelector((state) => state.shop.searchProdsCount);
  const searchValue = useSelector((state) => state.shop.searchValue);
  const pageNum = useSelector((state) => state.shop.pageNum);

  return (
    <Container>
      <Grid container>
        <Grid
          container
          item
          xs={1}
          alignItems="center"
          style={{ paddingTop: 20, paddingBottom: 20, cursor: "pointer" }}
          onClick={() => hist.goBack()}
        >
          <BackArrow />
          <Typography>返回</Typography>
        </Grid>
        <Grid item xs={9} container alignItems="center">
          <Typography variant="h6">搜索结果：{searchProdsCount} 条</Typography>
        </Grid>
        <Grid xs={12}>
          {searchProds?.length > 0 && <ProdList prods={searchProds} />}
        </Grid>
        <Grid xs={12} style={{ padding: "20px 100px" }}>
          <CustomButton
            label={t("components.button.expand").toUpperCase()}
            handleFunc={() =>
              dispatch(fetchSearchProds({ searchValue, pageNum: pageNum + 1 }))
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}
