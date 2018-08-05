package web;

import java.io.File;

public class ModifyFileName {
	
	public static void main(String[] args) {
		String path = "E:\\CMMI3\\CMMI3培训\\广东茂名应急管理系统\\产品区\\验收报告";
		
		File file = new File(path);
		String p = "广东茂名市应急管理系统";
		if(file.isDirectory()){
			File[] files = file.listFiles();
			for(int i=0;i<files.length;i++){
				String name = files[i].getName();
				String s = name.split("-")[1];
				p += s;
				File f = new File(path + p);
				System.out.println(f);
			}
		}
	}
}
