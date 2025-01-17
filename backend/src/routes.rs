use axum::{extract::Json as RJson, response::Json};
use mongodb::bson::doc;
use serde_json::Value;
use crate::db;

pub async fn hello() -> &'static str {
    "Access Denied."
}

//sales
pub async fn get_sales_products()->Json<Value>{db::get_all_db("products").await}

pub async fn add_sales_product(RJson(params):RJson<Value>)->Json<Value>{
    let doc=doc!{"id":params["id"].as_str(),"title":params["title"].as_str(),"des":params["des"].as_str(),"state":params["state"].as_str(),"img":params["img"].as_str(),"uname":params["uname"].as_str(),"pass":params["pass"].as_str(),"pass1":params["pass1"].as_str(),"rating":1.5,"reviews":[],"number":params["number"].as_str(),"name":params["name"].as_str(),"addr":params["addr"].as_str(),"price":params["price"].as_str(),"cur":params["cur"].as_str()};
    db::add_to_db("products", doc).await
}

pub async fn update_sales_product(RJson(params):RJson<Value>)->Json<Value>{
    let doc=doc!{"id":params["id"].as_str()};
    let udoc=doc!{"$set":{"title":params["title"].as_str(),"des":params["des"].as_str(),"state":params["state"].as_str(),"img":params["img"].as_str(),"uname":params["uname"].as_str(),"pass":params["pass"].as_str(),"pass1":params["pass1"].as_str(),"number":params["number"].as_str(),"name":params["name"].as_str(),"addr":params["addr"].as_str(),"price":params["price"].as_str(),"cur":params["cur"].as_str()}};
    db::update_one_db("products", doc,udoc).await
}

pub async fn add_comment(RJson(params):RJson<Value>)->Json<Value>{
    let doc=doc!{"id":params["id"].as_str()};
    let udoc=doc!{"$push":{"reviews":doc!{"comment":params["comment"].as_str(),"uname":params["uname"].as_str(),"rating":params["rating"].as_str()}}};
    db::update_one_db("products", doc,udoc).await
}

pub async fn remove_sales_product(RJson(params):RJson<Value>)->Json<Value>{
    let doc=doc!{"id":params["id"].as_str()};
    db::rm_one_db("products", doc).await
}

pub async fn verify_seller(RJson(params):RJson<Value>)->Json<Value>{
    let tmpuser=doc!{"uname":params["user"].as_str(),"pass":params["pass"].as_str()};
    let user=db::get_one_db("products", tmpuser).await;
    let res=if user["data"]["data"].is_boolean(){false}else{true};
   
    Json(serde_json::json!({"aye":res}))
}

pub async fn get_seller_products(RJson(params):RJson<Value>)->Json<Value>{
    let doc=doc!{"uname":params["a"].as_str()};
    db::get_all_specific("products", doc).await
}

pub async fn get_seller_product(RJson(params):RJson<Value>)->Json<Value>{
    let doc=doc!{"id":params["id"].as_str()};
    db::get_one_specific("products", doc).await
}

