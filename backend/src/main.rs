use axum::{routing::{get, post}, Router};
use tower_http::cors::CorsLayer;
use market::routes;

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    let router = Router::new()
    //makertplace
    .route("/addsales", post(routes::add_sales_product))
    .route("/getsales", get(routes::get_sales_products))
    .route("/vseller", post(routes::verify_seller))
    .route("/gseller", post(routes::get_seller_products))
    .route("/gproduct", post(routes::get_seller_product))
    .route("/uproduct", post(routes::update_sales_product))
    .route("/rmproduct", post(routes::remove_sales_product))
    .route("/addcomment", post(routes::add_comment))
    //ping
    .route("/", get(routes::hello))
    .layer(CorsLayer::permissive());

    Ok(router.into())
}



