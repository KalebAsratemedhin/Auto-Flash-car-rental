'use client'
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer";

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  // const session = useSession()
  // const dispatch = useDispatch()
  // const token = useSelector(authSelector)

  // useEffect(() => {


  //   if(session.status === "authenticated"){
  //     console.log(session.data.user,'token')
  //     dispatch(setSession(session.data.user.accessToken))
  //   }

  // }, [session.status, dispatch, setSession, session.data])


  // if (token.accessToken || session.status === "unauthenticated"){
    return (
      <div className="w-full">
              
          <Header />
  
          <div className="bg-lavender dark:bg-black dark:text-white">
              {children}
  
          </div>
          <Footer />
      </div>
    )
  // }


}

export default layout


