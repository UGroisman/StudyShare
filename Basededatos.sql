USE [master]
GO
/****** Object:  Database [StudyShare]    Script Date: 19/8/2022 09:00:18 ******/
CREATE DATABASE [StudyShare]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'StudyShare', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\StudyShare.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'StudyShare_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\StudyShare_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [StudyShare] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [StudyShare].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [StudyShare] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [StudyShare] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [StudyShare] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [StudyShare] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [StudyShare] SET ARITHABORT OFF 
GO
ALTER DATABASE [StudyShare] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [StudyShare] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [StudyShare] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [StudyShare] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [StudyShare] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [StudyShare] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [StudyShare] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [StudyShare] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [StudyShare] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [StudyShare] SET  DISABLE_BROKER 
GO
ALTER DATABASE [StudyShare] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [StudyShare] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [StudyShare] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [StudyShare] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [StudyShare] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [StudyShare] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [StudyShare] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [StudyShare] SET RECOVERY FULL 
GO
ALTER DATABASE [StudyShare] SET  MULTI_USER 
GO
ALTER DATABASE [StudyShare] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [StudyShare] SET DB_CHAINING OFF 
GO
ALTER DATABASE [StudyShare] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [StudyShare] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [StudyShare] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'StudyShare', N'ON'
GO
ALTER DATABASE [StudyShare] SET QUERY_STORE = OFF
GO
USE [StudyShare]
GO
/****** Object:  User [Lol]    Script Date: 19/8/2022 09:00:18 ******/
CREATE USER [Lol] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [idkk]    Script Date: 19/8/2022 09:00:18 ******/
CREATE USER [idkk] FOR LOGIN [idkk] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [idk]    Script Date: 19/8/2022 09:00:18 ******/
CREATE USER [idk] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Gumpydev]    Script Date: 19/8/2022 09:00:18 ******/
CREATE USER [Gumpydev] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 19/8/2022 09:00:18 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [idkk]
GO
ALTER ROLE [db_datareader] ADD MEMBER [idkk]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [idkk]
GO
ALTER ROLE [db_owner] ADD MEMBER [Gumpydev]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [Gumpydev]
GO
/****** Object:  Table [dbo].[Comentario]    Script Date: 19/8/2022 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comentario](
	[IdUsuario] [int] NOT NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IdPost] [int] NOT NULL,
	[Texto] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Comentario] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[etiquetas]    Script Date: 19/8/2022 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[etiquetas](
	[nombre] [nvarchar](50) NOT NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_etiquetas] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EtiquetasPorPost]    Script Date: 19/8/2022 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EtiquetasPorPost](
	[IdEtiqueta] [int] NOT NULL,
	[IdPost] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Materia]    Script Date: 19/8/2022 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Materia](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[ColorCode] [nvarchar](50) NULL,
 CONSTRAINT [PK_Materia] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Posts]    Script Date: 19/8/2022 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posts](
	[idUsuario] [int] NOT NULL,
	[tipo] [bit] NOT NULL,
	[titulo] [nvarchar](80) NOT NULL,
	[descripcion] [nvarchar](max) NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Puntuacion] [int] NOT NULL,
	[linkArchivo] [nvarchar](max) NOT NULL,
	[IdMateria] [int] NOT NULL,
	[fecha] [datetime] NULL,
 CONSTRAINT [PK_Posts] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 19/8/2022 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[mail] [nvarchar](max) NOT NULL,
	[nombre] [nvarchar](50) NOT NULL,
	[contrasena] [nvarchar](25) NOT NULL,
	[reputacion] [int] NOT NULL,
	[fotodeperfil] [nvarchar](max) NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsuarioPuntajeAComentario]    Script Date: 19/8/2022 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarioPuntajeAComentario](
	[IdComentario] [int] NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[Voto] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsuarioPuntajeAPost]    Script Date: 19/8/2022 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarioPuntajeAPost](
	[IdUsuario] [int] NOT NULL,
	[IdPost] [int] NOT NULL,
	[Voto] [int] NOT NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Comentario] ON 

INSERT [dbo].[Comentario] ([IdUsuario], [ID], [IdPost], [Texto]) VALUES (1, 1, 2, N'KBJSDFKLJSDFNKL')
INSERT [dbo].[Comentario] ([IdUsuario], [ID], [IdPost], [Texto]) VALUES (2, 2, 3, N'bdfjdgd')
INSERT [dbo].[Comentario] ([IdUsuario], [ID], [IdPost], [Texto]) VALUES (2, 3, 2, N'jhcbjksdl')
SET IDENTITY_INSERT [dbo].[Comentario] OFF
GO
SET IDENTITY_INSERT [dbo].[etiquetas] ON 

INSERT [dbo].[etiquetas] ([nombre], [ID]) VALUES (N'5to Año', 1)
INSERT [dbo].[etiquetas] ([nombre], [ID]) VALUES (N'6to Año', 2)
INSERT [dbo].[etiquetas] ([nombre], [ID]) VALUES (N'fisica', 3)
SET IDENTITY_INSERT [dbo].[etiquetas] OFF
GO
INSERT [dbo].[EtiquetasPorPost] ([IdEtiqueta], [IdPost]) VALUES (1, 2)
INSERT [dbo].[EtiquetasPorPost] ([IdEtiqueta], [IdPost]) VALUES (1, 3)
INSERT [dbo].[EtiquetasPorPost] ([IdEtiqueta], [IdPost]) VALUES (3, 3)
GO
SET IDENTITY_INSERT [dbo].[Materia] ON 

INSERT [dbo].[Materia] ([ID], [Nombre], [ColorCode]) VALUES (1, N'Lengua', N'#FFFFFF')
SET IDENTITY_INSERT [dbo].[Materia] OFF
GO
SET IDENTITY_INSERT [dbo].[Posts] ON 

INSERT [dbo].[Posts] ([idUsuario], [tipo], [titulo], [descripcion], [ID], [Puntuacion], [linkArchivo], [IdMateria], [fecha]) VALUES (1, 1, N'Resumen Martin Fierro', N'MI RESUMEN', 2, 1, N'link.com', 1, NULL)
INSERT [dbo].[Posts] ([idUsuario], [tipo], [titulo], [descripcion], [ID], [Puntuacion], [linkArchivo], [IdMateria], [fecha]) VALUES (2, 1, N'Como se hace un post?', N'SON MUY RICAS LAS BANANAS DE IVAN', 3, 0, N'https://docs.google.com/document/d/1cRybQgMb17YbEeC1_-CT6vnLJzA32klxFS50W5wXJUs/edit', 1, NULL)
INSERT [dbo].[Posts] ([idUsuario], [tipo], [titulo], [descripcion], [ID], [Puntuacion], [linkArchivo], [IdMateria], [fecha]) VALUES (2, 1, N'FECHA', N'FECHA TEST', 5, 0, N'youtube.com', 1, CAST(N'2022-08-19T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Posts] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([ID], [mail], [nombre], [contrasena], [reputacion], [fotodeperfil]) VALUES (1, N'MatiLol@gmail.com', N'MatiasmcxD', N'LolFXD23', 1, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoPXbN37_BNrq7GHDvK48zMV-gtV8R_285TA&usqp=CAU')
INSERT [dbo].[Usuario] ([ID], [mail], [nombre], [contrasena], [reputacion], [fotodeperfil]) VALUES (2, N'lol@gmail.com', N'Enfasys01', N'fCn', 0, N'TROLL.jpg')
INSERT [dbo].[Usuario] ([ID], [mail], [nombre], [contrasena], [reputacion], [fotodeperfil]) VALUES (3, N'MatiLol@gmail.com', N'MatiasmcxD', N'LolFXD23', 0, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoPXbN37_BNrq7GHDvK48zMV-gtV8R_285TA&usqp=CAU')
INSERT [dbo].[Usuario] ([ID], [mail], [nombre], [contrasena], [reputacion], [fotodeperfil]) VALUES (4, N'ivan@mediaware.org', N'ivan', N'1234', 0, NULL)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Comentario]  WITH CHECK ADD  CONSTRAINT [FK_Comentario_Posts] FOREIGN KEY([IdPost])
REFERENCES [dbo].[Posts] ([ID])
GO
ALTER TABLE [dbo].[Comentario] CHECK CONSTRAINT [FK_Comentario_Posts]
GO
ALTER TABLE [dbo].[Comentario]  WITH CHECK ADD  CONSTRAINT [FK_Comentario_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([ID])
GO
ALTER TABLE [dbo].[Comentario] CHECK CONSTRAINT [FK_Comentario_Usuario]
GO
ALTER TABLE [dbo].[EtiquetasPorPost]  WITH CHECK ADD  CONSTRAINT [FK_EtiquetasPorPost_etiquetas] FOREIGN KEY([IdEtiqueta])
REFERENCES [dbo].[etiquetas] ([ID])
GO
ALTER TABLE [dbo].[EtiquetasPorPost] CHECK CONSTRAINT [FK_EtiquetasPorPost_etiquetas]
GO
ALTER TABLE [dbo].[EtiquetasPorPost]  WITH CHECK ADD  CONSTRAINT [FK_EtiquetasPorPost_Posts] FOREIGN KEY([IdPost])
REFERENCES [dbo].[Posts] ([ID])
GO
ALTER TABLE [dbo].[EtiquetasPorPost] CHECK CONSTRAINT [FK_EtiquetasPorPost_Posts]
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD  CONSTRAINT [FK_Posts_Materia] FOREIGN KEY([IdMateria])
REFERENCES [dbo].[Materia] ([ID])
GO
ALTER TABLE [dbo].[Posts] CHECK CONSTRAINT [FK_Posts_Materia]
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD  CONSTRAINT [FK_Posts_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([ID])
GO
ALTER TABLE [dbo].[Posts] CHECK CONSTRAINT [FK_Posts_Usuario]
GO
ALTER TABLE [dbo].[UsuarioPuntajeAComentario]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioPuntajeAComentario_Comentario] FOREIGN KEY([IdComentario])
REFERENCES [dbo].[Comentario] ([ID])
GO
ALTER TABLE [dbo].[UsuarioPuntajeAComentario] CHECK CONSTRAINT [FK_UsuarioPuntajeAComentario_Comentario]
GO
ALTER TABLE [dbo].[UsuarioPuntajeAComentario]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioPuntajeAComentario_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([ID])
GO
ALTER TABLE [dbo].[UsuarioPuntajeAComentario] CHECK CONSTRAINT [FK_UsuarioPuntajeAComentario_Usuario]
GO
ALTER TABLE [dbo].[UsuarioPuntajeAPost]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioPuntajeAPost_Posts] FOREIGN KEY([IdPost])
REFERENCES [dbo].[Posts] ([ID])
GO
ALTER TABLE [dbo].[UsuarioPuntajeAPost] CHECK CONSTRAINT [FK_UsuarioPuntajeAPost_Posts]
GO
ALTER TABLE [dbo].[UsuarioPuntajeAPost]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioPuntajeAPost_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([ID])
GO
ALTER TABLE [dbo].[UsuarioPuntajeAPost] CHECK CONSTRAINT [FK_UsuarioPuntajeAPost_Usuario]
GO
USE [master]
GO
ALTER DATABASE [StudyShare] SET  READ_WRITE 
GO
