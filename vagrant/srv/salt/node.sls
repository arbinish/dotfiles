vim:
    pkg.installed

python-mysqldb:
    pkg.installed

memcached: 
    pkg.installed

python-git:
    pkg.installed

java6:
    cmd.script:
        - source: salt://install_jdk6.sh
        - shell: /bin/bash
        - user: root
        - group: root

sysctl:
        sysctl.present:
            - name: vm.swappiness
            - value: 0

/home/vagrant:
    file.recurse:
        - source: salt://vagrant
        - user: vagrant
        - group: vagrant
