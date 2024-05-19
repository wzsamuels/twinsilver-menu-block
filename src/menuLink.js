const MenuLink = (props) => {
  const {className, ...rest} = props;
  const defaultClassNames = "menu-link no-underline px-4 py-2 mx-1 relative after:transition after:absolute after:w-full after:right-1/2 after:translate-x-[0%] after:hover:h-[2px] after:top-[100%] after:left-0 after:h-[2px]"
  const combinedClassNames = `${defaultClassNames} ${className}`

  return (
    <a
      className={combinedClassNames}
      {...rest}>
      {props.children}
    </a>
  )
}

export default MenuLink;