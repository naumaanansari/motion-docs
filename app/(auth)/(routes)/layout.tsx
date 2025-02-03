const RootLayout = ({
    children
}:{
    children: React.ReactNode;
}
    
) => {
    return ( 
        <div className="bg-red-500 text-white h-full">
            {children}
        </div>
     );
}
 
export default RootLayout;