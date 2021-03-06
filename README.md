# Flatten

## Development setup

### Provisioning

For running the project on the development environment we use vagrant.
Make sure you have VirtualBox, Vagrant and ansible installed.
* VirtualBox can be installed with [the intaller provided by the VirtualBox
website](https://www.virtualbox.org/wiki/Downloads).
* Vagrant can be installed with [the installer provided by the Vagrant
website](http://www.vagrantup.com/downloads.html)
* Ansible can be installed with brew: `brew install ansible` or by any other
  method [listed here](http://docs.ansible.com/intro_installation.html).

To setup the vagrant machine, first clone the repo, add the settings and then
run `vagrant up`:
```
$ git clone git@github.com:sborrazas/flatten
$ cd flatten
$ cp ansible/group_vars/development.yml{.sample,}
$ vagrant up
```

Make sure no errors come up before proceeding.

Note: it is recommended to add more RAM to the VM through Virtualbox to run the
app.

You may now get into the VM by running `vagrant ssh`. Vagrant access the repo
from `/vagrant`. However, an easier way to start the server is with the
included script:
```
$ ./bin/start-server
```

## Staging/Production setup

### Provisioning

Once you have ansible, you can proceed to provision different Ubuntu hosts.

To do so, you first need to edit the inventory file on `ansible/` with the group
name (production or staging) and update the group with the list of hosts.
```
[staging]
staging1.staging.com
staging2.staging.com
staging3.staging.com
```

Update the group variables in case you need to do so under
`ansible/group_vars/` by using `ansible/group_vars/production.yml.sample` as
the sample:
```
$ cp ansible/group_vars/production.yml{.sample,}
$ ansible-vault encrypt ansible/group_vars/production.yml
$ ansible-vault edit ansible/group_vars/production.yml
```

Make sure you have the `~/.ssh/authorized_keys` file with your public key on the
root user first.

Also, make sure you add the public key from the config to the GitHub deploy
keys.

To run the provision you now need to run the ansible provision playbook. Before
running it, check that the hosts list affected are the ones desired:
```
$ ansible-playbook ansible/provision.yml --inventory=ansible/production --list-hosts --ask-vault-pass
```

You should now run the provision playbook. Since we're using an encrypted file
as the group settings, add the `--ask-vault-pass` option:
```
$ ansible-playbook ansible/provision.yml --inventory=ansible/production --ask-vault-pass
```

### Deploying

To deploy to a given inventory list, you should run ansible specifying the
inventory and playbook:

```
$ ansible-playbook ansible/deploy.yml --inventory=ansible/production --ask-vault-pass
```
