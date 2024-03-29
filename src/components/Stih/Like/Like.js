import "./Like.css"
import { db } from "../../db";
import { useEffect, useState } from "react";
import ky from "ky";

function Like(props) {
    let stihId = props.id
    let [ like, setLike ] = useState(false)

    async function getDefaultLikeState(stihId) {
        const likeInDb = await db.likes.get({stihId:stihId})
        if (likeInDb) {
            setLike(true);
        } else {
            setLike(false);
        }
    }
    
    useEffect(() => {
        getDefaultLikeState(stihId);
    }, []);

    async function likeDislike(likeStatus) {
        try {
            if (likeStatus) {
                setLike(true);
                await db.likes.add({"stihId": stihId});
                ky.get("/api/stih/" + stihId + "/like", { timeout: 20000 })
                .catch((error) => {
                    console.log("Like not sent")
                });
            } else {
                setLike(false);
                await db.likes.where("stihId").equals(stihId).delete();
                ky.get("/api/stih/" + stihId + "/dislike", { timeout: 20000 })
                .catch((error) => {
                    console.log("Like not sent")
                });
            }
          } catch (error) {
            console.log(`Не удалось поставить лайк ${error}`);
          }
    }

    return (
        <div className="like-root">
            <input type="checkbox" checked={like} autoComplete='off' onChange={e => likeDislike(e.target.checked)} />
            <div className="like-triangle"><div className="like-triangle-inner"></div></div>
        </div>
    )
}

export default Like;