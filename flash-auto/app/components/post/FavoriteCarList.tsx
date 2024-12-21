// import { useGetFavoritesQuery } from "@/redux/api/userAPI"
// import CustomError from "../utils/CustomError"
// import CustomLoading from "../utils/CustomLoading"
// import CarList from "./CarList"

// const UserFavoriteCarList = ({id}: {id: string}) => {
//   const {isLoading, isError, isSuccess, data, error} = useGetFavoritesQuery(id)

//   if(isLoading)
//     return <CustomLoading />

//   if(isError)
//     return <CustomError error={error} />

//   if(isSuccess )
//     return (
//         <div>
//             <h1 className='text-3xl font-bold'>Favorite cars</h1>

//             <CarList cars={data.data!} />
//         </div>
//     )
// }

// export default UserFavoriteCarList