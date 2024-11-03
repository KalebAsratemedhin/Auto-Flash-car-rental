// 'use client';
// import { useForm } from 'react-hook-form';
// import TextField from '../utils/TextField';
// import { useCreatePostMutation } from '@/redux/api/postAPI'; 
// import { CreatePost } from '@/types/Post';

// interface CarFormInputs {
//   make: string;
//   model: string;
//   age: number;
//   count: number;
//   price: number;
//   description: string;
//   photo: any;
// }

// const CarForm: React.FC = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<CarFormInputs>({
//     defaultValues: {
//         make: '',
//         model: '',
//         age: 0,
//         count: 0,
//         price: 0,
//         description: '',
//         photo: ''
//     }
//   });
//   const [createPost, { isLoading }] = useCreatePostMutation(); 
//   const onSubmit = async (data: CarFormInputs) => {
//     const formData = new FormData();
//     formData.append("make", data.make);
//     formData.append("model", data.model);
//     formData.append("age", data.age.toString());
//     formData.append("count", data.count.toString());
//     formData.append("price", data.price.toString());
//     formData.append("description", data.description);
//     formData.append("photo", data.photo[0]); 
//     try {
//       // Make the API request to post the car data
//       console.log('formData', formData)
//       await createPost(formData ).unwrap(); // Using RTK Query
//       alert('Car posted successfully!');
//       reset(); // Reset the form after submission
//     } catch (error) {
//       console.error('Failed to post car:', error);
//       alert('An error occurred while posting the car.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Post a Car</h2>

//       <TextField
//         label="Make"
//         id="make"
//         type="text"
//         register={register}
//         validation={{ required: "Make is required" }}
//         error={errors.make?.message}
//       />
//       <TextField
//         label="Model"
//         id="model"
//         type="text"
//         register={register}
//         validation={{ required: "Model is required" }}
//         error={errors.model?.message}
//       />
//       <TextField
//         label="Age"
//         id="age"
//         type="number"
//         register={register}
//         validation={{ required: "Age is required", valueAsNumber: true }}
//         error={errors.age?.message}
//       />
//       <TextField
//         label="Count"
//         id="count"
//         type="number"
//         register={register}
//         validation={{ required: "Count is required", valueAsNumber: true }}
//         error={errors.count?.message}
//       />
//       <TextField
//         label="Price"
//         id="price"
//         type="number"
//         register={register}
//         validation={{ required: "Price is required", valueAsNumber: true }}
//         error={errors.price?.message}
//       />

//       <div className="w-full my-4">
//         <label className="text-gray-500" htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           className="w-full block border rounded-xl px-2 py-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300"
//           {...register("description", { required: "Description is required" })}
//         />
//         {errors.description && <p className="text-red-500 text-base mt-1">{errors.description.message}</p>}
//       </div>

//       <div className="w-full my-4">
//         <label className="text-gray-500" htmlFor="photo">Upload Photo</label>
//         <input
//           type="file"
//           id="photo"
//           className="w-full block"
//           {...register("photo", { required: "Photo is required" })}
//         />
//         {/* {errors.photo && <p className="text-red-500 text-base mt-1">{errors.photo.message}</p>} */}
//       </div>

//       <button
//         type="submit"
//         className={`w-full bg-red-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl mt-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         disabled={isLoading} // Disable button while loading
//       >
//         {isLoading ? 'Posting...' : 'Post Car'}
//       </button>
//     </form>
//   );
// };

// export default CarForm;


'use client';
import { useForm } from 'react-hook-form';
import TextField from '../utils/TextField';
import { useCreatePostMutation } from '@/redux/api/postAPI'; // Adjust the import path as necessary
import CustomLoading from '../utils/CustomLoading';
import { error } from 'console';
import CustomError from '../utils/CustomError';
import CustomSuccess from '../utils/CustomSuccess';

interface CarFormInputs {
  make: string;
  model: string;
  age: number;
  count: number;
  price: number;
  description: string;
  photo: FileList;
}

const CarForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CarFormInputs>();

  const [createPost, { isLoading, isError, isSuccess, error }] = useCreatePostMutation(); // Hook to call createPost API

  const onSubmit = async (data: CarFormInputs) => {
    const formData = new FormData();
    formData.append("make", data.make);
    formData.append("model", data.model);
    formData.append("age", data.age.toString());
    formData.append("count", data.count.toString());
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("photo", data.photo[0]);


    for (var [key, value] of formData.entries()) { 
      console.log(key, value);
    }
    try {
      await createPost(formData).unwrap();
    } catch (error) {
      alert('An error occurred while posting the car.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Post a Car</h2>

      <TextField
        label="Make"
        id="make"
        type="text"
        register={register}
        validation={{ required: "Make is required" }}
        error={errors.make?.message}
      />
      <TextField
        label="Model"
        id="model"
        type="text"
        register={register}
        validation={{ required: "Model is required" }}
        error={errors.model?.message}
      />
      <TextField
        label="Age"
        id="age"
        type="number"
        register={register}
        validation={{ required: "Age is required", valueAsNumber: true }}
        error={errors.age?.message}
      />
      <TextField
        label="Count"
        id="count"
        type="number"
        register={register}
        validation={{ required: "Count is required", valueAsNumber: true }}
        error={errors.count?.message}
      />
      <TextField
        label="Price"
        id="price"
        type="number"
        register={register}
        validation={{ required: "Price is required", valueAsNumber: true }}
        error={errors.price?.message}
      />

      <div className="w-full my-4">
        <label className="text-gray-500" htmlFor="description">Description</label>
        <textarea
          id="description"
          className="w-full block border rounded-xl px-2 py-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p className="text-red-500 text-base mt-1">{errors.description.message}</p>}
      </div>

      <div className="w-full my-4">
        <label className="text-gray-500" htmlFor="photo">Upload Photo</label>
        <input
          type="file"
          id="photo"
          className="w-full block"
          {...register("photo", { required: "Photo is required" })}
        />
        {
        errors.photo && <p className="text-red-500 text-base mt-1">{errors.photo.message}</p>
        }
      </div> 
      {isLoading && <CustomLoading /> }
      {isError && <CustomError error={error} /> }
      {isSuccess && <CustomSuccess message={'Successfully posted your car.'} /> }
      

      <button
        type="submit"
        className={`w-full bg-red-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl mt-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? 'Posting...' : 'Post Car'}
      </button>
    </form>
  );
};

export default CarForm;

